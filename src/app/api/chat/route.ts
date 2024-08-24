import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';


// Defining systemPrompt
const systemPrompt = `
You are Guru Nimbus, an AI assistant specialized in helping students find the best professors for their courses. Your primary function is to analyze student queries and provide recommendations for the top 3 most suitable professors using a Retrieval-Augmented Generation (RAG) system.

Your capabilities include:

1. Understanding and interpreting student queries about courses, teaching styles, and professor preferences.
2. Accessing a comprehensive database of professor reviews, ratings, and course information.
3. Using RAG to retrieve relevant information and generate personalized responses.
4. Providing detailed, unbiased information about professors and their teaching methods.
5. Offering insights into course difficulty, workload, and overall student satisfaction.

For each query, you should:

1. Analyze the student's requirements and preferences.
2. Use RAG to search the database and retrieve relevant information.
3. Synthesize the information to recommend the top 3 most suitable professors.
4. Present each recommendation with a brief explanation of why the professor is a good fit.
5. Include relevant details such as the professor's teaching style, course difficulty, and overall rating.

Remember to:

- Be objective and base your recommendations on factual data from your database.
- Consider multiple factors such as teaching quality, course content, grading fairness, and student feedback.
- Provide balanced information, mentioning both strengths and potential challenges for each professor.
- Encourage students to make their own informed decisions based on the information you provide.
- Respect privacy by not sharing personal information about professors or students.
- If you don't have enough information to make a recommendation, be honest about the limitations.

Your goal is to help students make informed decisions about their course selections by providing accurate, helpful, and personalized professor recommendations.
`
// POST function 
export async function POST(req: { json: () => any; }) {
    const data = await req.json();
    // Initialize Pinecone and OpenAI
    const pineconeApiKey = process.env.PINECONE_API_KEY || '';
    const pc = new Pinecone({
        apiKey: pineconeApiKey,
    })

    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI()

    // Extract user's question & create embeddings
    const text = data[data.length - 1].content
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    })

    // Query pinecone
    const results = await index.query({
        topK: 3, // How many result you want
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    })


    // String that sends results back to openai
    let resultString = '\n\nReturned Results from vector db(done automatically):'
    results.matches.forEach((match) => {
        resultString += `\n
        Professor: ${match.id}
        Review: ${match.metadata ? match.metadata.review : 'N/A'}
        Subject: ${match.metadata ? match.metadata.subject : 'N/A'}
        \n\n
        `
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1) 
    // OpenAI Request
    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            ...lastDataWithoutLastMessage,
            { role: 'user', content: lastMessageContent },
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
    })

    // Creating Readable Stream
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    return new NextResponse(stream)
}



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// import { Pinecone } from '@pinecone-database/pinecone';
// import { NextResponse } from 'next/server';

// // Define systemPrompt
// const systemPrompt = `
// You are Guru Nimbus, an AI assistant specialized in helping students find the best professors for their courses. Your primary function is to analyze student queries and provide recommendations for the top 3 most suitable professors using a Retrieval-Augmented Generation (RAG) system.

// Your capabilities include:

// 1. Understanding and interpreting student queries about courses, teaching styles, and professor preferences.
// 2. Accessing a comprehensive database of professor reviews, ratings, and course information.
// 3. Using RAG to retrieve relevant information and generate personalized responses.
// 4. Providing detailed, unbiased information about professors and their teaching methods.
// 5. Offering insights into course difficulty, workload, and overall student satisfaction.

// For each query, you should:

// 1. Analyze the student's requirements and preferences.
// 2. Use RAG to search the database and retrieve relevant information.
// 3. Synthesize the information to recommend the top 3 most suitable professors.
// 4. Present each recommendation with a brief explanation of why the professor is a good fit.
// 5. Include relevant details such as the professor's teaching style, course difficulty, and overall rating.

// Remember to:

// - Be objective and base your recommendations on factual data from your database.
// - Consider multiple factors such as teaching quality, course content, grading fairness, and student feedback.
// - Provide balanced information, mentioning both strengths and potential challenges for each professor.
// - Encourage students to make their own informed decisions based on the information you provide.
// - Respect privacy by not sharing personal information about professors or students.
// - If you don't have enough information to make a recommendation, be honest about the limitations.

// Your goal is to help students make informed decisions about their course selections by providing accurate, helpful, and personalized professor recommendations.
// `;

// // POST function
// export async function POST(req: { json: () => any; }) {
//     const data = await req.json();

//     // Initialize Pinecone and Cloudflare API
//     const pineconeApiKey = process.env.PINECONE_API_KEY || '';
//     const cloudflareApiKey = process.env.CLOUDFLARE_API_KEY || '';
//     const pc = new Pinecone({
//         apiKey: pineconeApiKey,
//     });

//     const index = pc.index('rag').namespace('ns1');

//     // Extract user's question
//     const text = data[data.length - 1].content;

//     // Call Cloudflare API for embeddings (assuming it has a similar endpoint)
//     const embeddingResponse = await fetch('https://api.cloudflare.com/client/v4/embeddings', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${cloudflareApiKey}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             model: 'text-embedding-3-small',
//             input: text,
//         }),
//     });
//     const embeddingData = await embeddingResponse.json();
//     const embedding = embeddingData.data[0].embedding;

//     // Query Pinecone
//     const results = await index.query({
//         topK: 3, // How many result you want
//         includeMetadata: true,
//         vector: embedding,
//     });

//     // String that sends results back to Cloudflare API
//     let resultString = '\n\nReturned Results from vector db (done automatically):';
//     results.matches.forEach((match) => {
//         resultString += `\n
//         Professor: ${match.id}
//         Review: ${match.metadata ? match.metadata.review : 'N/A'}
//         Subject: ${match.metadata ? match.metadata.subject : 'N/A'}
//         \n\n
//         `;
//     });

//     const lastMessage = data[data.length - 1];
//     const lastMessageContent = lastMessage.content + resultString;
//     const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

//     // Call Cloudflare API for chat completions (assuming it has a similar endpoint)
//     const completionResponse = await fetch('https://api.cloudflare.com/client/v4/chat/completions', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${cloudflareApiKey}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             messages: [
//                 { role: 'system', content: systemPrompt },
//                 ...lastDataWithoutLastMessage,
//                 { role: 'user', content: lastMessageContent },
//             ],
//             model: 'chat-model-id', // Replace with the appropriate model ID
//         }),
//     });

//     const completionData = await completionResponse.json();

//     // Creating Readable Stream
//     const stream = new ReadableStream({
//         async start(controller) {
//             const encoder = new TextEncoder();
//             try {
//                 for (const chunk of completionData.choices) {
//                     const content = chunk.delta?.content;
//                     if (content) {
//                         const text = encoder.encode(content);
//                         controller.enqueue(text);
//                     }
//                 }
//             } catch (err) {
//                 controller.error(err);
//             } finally {
//                 controller.close();
//             }
//         },
//     });
//     return new NextResponse(stream);
// }
