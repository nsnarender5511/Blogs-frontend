import { connectToDatabase } from './db';
import Article from '../models/Article';

export async function fetchArticles(query = {}, options = {}) {
  try {
    const db = await connectToDatabase();
    const articles = await db.collection('articles').find(query).sort({ publishDate: -1 }).toArray();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export async function createArticle(articleData: any) {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('articles').insertOne(articleData);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
} 