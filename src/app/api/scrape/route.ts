import { NextResponse } from 'next/server';
import scraper from '@/utils/scraper'
import { isValidUrl } from '@/utils/urlFilter'
import { openai, createEmbeddings } from '@/utils/embeddings'
import { pc, ensurePineconeIndex, insertDataIntoPinecone } from '@/utils/pineconeClient'

interface ScrapedData {
  profName: string,
  profRatingValue: string
  profDifficulty: string
  numOfRatings: string,
  profDepartment: string
  profSchool: string,
  profReviews: string[]
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'A URL is required' }, { status: 400 });
    }
    if (!isValidUrl(url)) {
      return NextResponse.json({ error: 'URL is in the wrong format (e.g www.ratemyprofessors.com/professor/12312)' }, { status: 400 });
    }
    
    // Initialize pinecone index and make sure it exists 
    try {
      await ensurePineconeIndex();
    } catch (error) {
      console.error('Error ensuring Pinecone index:', error);
      return NextResponse.json({ error: 'Failed to initialize Pinecone index' }, { status: 500 });
    }

    // Scrape data 
    let data: ScrapedData;
    try {
      data = await scraper(url) as ScrapedData;
      console.log('Scraped data:', data);
    } catch (error) {
      console.error('Error scraping data:', error);
      return NextResponse.json({ error: 'Failed to scrape the page' }, { status: 500 });
    }

    // Create embeddings using scraped data
    let embeddings;
    try {
      embeddings = await createEmbeddings(data);
    } catch (error) {
      console.error('Error creating embeddings:', error);
      return NextResponse.json({ error: 'Failed to create embeddings' }, { status: 500 });
    }
    
    // Insert data into Pinecone
    const metadata = {
      profName: data.profName,
      profRatingValue: data.profRatingValue,
      profDifficulty: data.profDifficulty,
      numOfRatings: data.numOfRatings,
      profDepartment: data.profDepartment,
      profSchool: data.profSchool,
      profReviews: data.profReviews
    };
    try {
      await insertDataIntoPinecone(embeddings, metadata);
    } catch (error) {
      console.error('Error inserting data into Pinecone:', error);
      return NextResponse.json({ error: 'Failed to insert data into Pinecone' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in /api/scrape:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}