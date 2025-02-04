import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const articles = await db.collection('blogs').find({}).toArray();
    console.log("articles : ", articles);
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    
    const result = await db.collection('articles').insertOne(body);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
} 