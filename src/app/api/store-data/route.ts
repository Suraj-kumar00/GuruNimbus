import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';

// Set up cache with TTL (time-to-live)
const myCache = new NodeCache({ stdTTL: 600 }); // 10 minutes

export async function POST(req: Request) {
  try {
    const data = await req.json();
    myCache.set("tempData", data); // Store data in the cache
    console.log(myCache)
    return NextResponse.json({ message: 'Data stored successfully' }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error storing data' }, {
      status: 500,
    });
  }
}

export async function GET() {
  const tempData = myCache.get("tempData");
  console.log(tempData)
  if (tempData) {
    return NextResponse.json(tempData);
  } else {
    return NextResponse.json({ message: 'No data available' }, {
      status: 404,
    });
  }
}