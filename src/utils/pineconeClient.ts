import { Pinecone } from '@pinecone-database/pinecone';

interface MetaData {
  profName: string,
  profRatingValue: string
  profDifficulty: string
  numOfRatings: string,
  profDepartment: string
  profSchool: string
}
// Initialize Pinecone client
export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string
});

// Ensure Pinecone Index
export async function ensurePineconeIndex() {
  try {
    // List existing indexes
    const existingIndexes = await pc.listIndexes();
    if (existingIndexes.indexes) {
      const indexExists = existingIndexes.indexes.some(index => index.name === 'rmp-data');
      // Check if 'rmp-data' already exists
      if (indexExists) {
        return // If it already exists then we can exit and continue to inserting data into this index
      }

      // If index does not exist, create it
      await pc.createIndex({
        name: 'rmp-data',
        dimension: 1536,
        metric: 'cosine',
        spec: { 
          serverless: { 
            cloud: 'aws', 
            region: 'us-east-1' 
          }
        } 
      });
    }
  } catch (error) {
    console.error("Error ensuring Pinecone index exists: ", error);
  }
}

// Insert Data into Pinecone Index ( Might change it so that in the future, the specific index is
// passed in as parameters as well, but for now we only have 1 index)
export async function insertDataIntoPinecone(embedding: number[], metadata: MetaData) {
  try {
    const index = pc.Index('rmp-data');

    // Prepare vectors with metadata
    const vectors = {
      id: metadata.profName, // Create a unique ID for each embedding
      values: embedding,
      metadata: {
        profName: metadata.profName,
        profRatingValue: metadata.profRatingValue,
        profDifficulty: metadata.profDifficulty,
        numOfRatings: metadata.numOfRatings,
        profDepartment: metadata.profDepartment,
        profSchool: metadata.profSchool,
      }
    };

    // Upsert vectors into Pinecone
    await index.upsert([vectors]);
  } catch (error) {
    console.error("Error inserting data into Pinecone: ", error);
  }
}