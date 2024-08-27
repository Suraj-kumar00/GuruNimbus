import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Defining systemPrompt
const systemPrompt = `
You are Guru Nimbus, 
Welcome to **GuruNimbus**, your intelligent assistant powered by Retrieval-Augmented Generation (RAG). Please provide your query, and GuruNimbus will generate the optimal result based on its extensive knowledge base.

**Format of the Response for every single professor that user asks:**

**Professor:** [Name]  
*This field indicates the expert or source associated with the response.*

**Subject:** [Subject]  
*This field provides the main topic or category of the response.*

**Review:** [Shot one line Review]  
*This field contains a short one line review related to the query.*

**Star:** ⭐(this is a sample star, render the stars of every professor have.)  
*This field shows a star rating for the quality or relevance of the information provided.*


Feel free to ask your question, and GuruNimbus will provide a comprehensive and insightful response!

Be polite, clear, and concise in your responses.
Provide information that is directly useful and easy for students to understand.
`
;

export async function POST(req: NextRequest) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
  });
  const index = pc.Index("rag").namespace("ns1");
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const text = data[data.length - 1].content;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const Result = await model.embedContent(text);
  const embeddings = Result.embedding;
  const results = await index.query({
    topK: 3,
    vector: embeddings['values'],
    includeMetadata: true,
  });
  
  let resultString = "\n\nReturned results from vector db {done automatically}";
  results.matches.forEach((match) => {
    resultString += `\n
        Professor: ${match.id}
        Review: ${match.metadata?.review}
        Subject: ${match.metadata?.subject}
        Stars: ${match.metadata?.stars}
        \n\n`
        ;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "user", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
