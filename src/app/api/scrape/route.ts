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

export async function POST(req:Request) {
  const { url } = await req.json();
  
  if (!url) {
    return NextResponse.json({ error: 'A URL is required' }, { status: 400 });
  }
  if (!isValidUrl(url)) {
    return NextResponse.json({ error: 'URL is in the wrong format (e.g www.ratemyprofessors.com/professor/12312)' }, { status: 400 });
  }
  
  try {
    // initialize pinecone index and make sure it exists 
    await ensurePineconeIndex()
    // scrape data 
    const data = await scraper(url) as ScrapedData; 
    // create embeddings using scraped data
    console.log(data)
    const embeddings = await createEmbeddings(data)
    
    // after getting scraped data, insert it into the database
    const metadata = {
      profName: data.profName,
      profRatingValue: data.profRatingValue,
      profDifficulty: data.profDifficulty,
      numOfRatings: data.numOfRatings,
      profDepartment: data.profDepartment,
      profSchool: data.profSchool,
      profReviews: data.profReviews
    };
    await insertDataIntoPinecone(embeddings, metadata);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: `Failed to scrape the page: ${error}` }, { status: 500 });
  }
}