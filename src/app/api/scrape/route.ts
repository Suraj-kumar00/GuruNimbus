import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface ProfessorData {
  name: string;
  school: string;
  rating: string;
  totalRatings: string;
  difficulty: string;
  tags: string[];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the HTML content of the page
    const response = await axios.get<string>(url);
    const profileHtml = response.data;

    // Ensure cheerio is loaded correctly
    const $ = cheerio.load(profileHtml);

    // Extract the desired information
    const name = $('.NameTitle__Name-dowf0z-0').text().trim() || 'N/A';
    const school = $('.NameTitle__Title-dowf0z-1').text().trim() || 'N/A';
    const rating = $('.RatingValue__Numerator-qw8sqy-2').first().text().trim() || 'N/A';
    const totalRatings = $('.RatingValue__NumRatings-qw8sqy-0').text().trim() || 'N/A';
    const difficulty = $('.RatingValue__Numerator-qw8sqy-2').eq(1).text().trim() || 'N/A';
    const tags = $('.Tag-bs9vf4-0').map((i, el) => $(el).text().trim()).get();

    const professorData: ProfessorData = {
      name,
      school,
      rating,
      totalRatings,
      difficulty,
      tags,
    };

    return NextResponse.json(professorData);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);

    let errorMessage = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      errorMessage = 'Failed to fetch the URL';
    } else if (error instanceof Error && error.message.includes('cheerio')) {
      errorMessage = 'Failed to parse the HTML content';
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}