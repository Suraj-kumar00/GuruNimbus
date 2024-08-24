import OpenAI from 'openai';

interface ScrapedData {
  profName: string,
  profRatingValue: string
  profDifficulty: string
  numOfRatings: string,
  profDepartment: string
  profSchool: string
}
export const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export async function createEmbeddings(scrapedData: ScrapedData) {
  const { profName, profRatingValue, profDifficulty, numOfRatings, profDepartment, profSchool } = scrapedData;
  const professorDataString = `${profName}, Rating: ${profRatingValue}, Difficulty: ${profDifficulty}, Number of Ratings: ${numOfRatings}, Department: ${profDepartment}, School: ${profSchool}`;
  const embeddingResponse = await openai.embeddings.create({
    input: professorDataString,
    model:'text-embedding-3-small'
  })
  const embedding = embeddingResponse.data[0].embedding;
  return embedding;
}