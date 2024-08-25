import axios from 'axios';

interface ScrapedData {
  profName: string;
  profRatingValue: string;
  profDifficulty: string;
  numOfRatings: string;
  profDepartment: string;
  profSchool: string;
}

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Replace with your Hugging Face API key
const EMBEDDINGS_MODEL = 'sentence-transformers/all-MiniLM-L6-v2'; // Replace with the desired embeddings model

export async function createEmbeddings(scrapedData: ScrapedData) {
  const { profName, profRatingValue, profDifficulty, numOfRatings, profDepartment, profSchool } = scrapedData;
  const professorDataString = `${profName}, Rating: ${profRatingValue}, Difficulty: ${profDifficulty}, Number of Ratings: ${numOfRatings}, Department: ${profDepartment}, School: ${profSchool}`;

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${EMBEDDINGS_MODEL}`,
      { inputs: professorDataString },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    // Assuming the response contains the embeddings in a similar structure to OpenAI's response
    const embedding = response.data;
    return embedding;
  } catch (error) {
    console.error('Error creating embeddings:', error);
    throw error;
  }
}
