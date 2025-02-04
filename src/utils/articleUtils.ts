import connectDB from './db';
import Article from '../models/Article';

export async function fetchArticles(query = {}, options = {}) {
  try {
    await connectDB();
    const articles = await Article.find(query, null, options).sort({ publishDate: -1 });
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export async function createArticle(articleData: any) {
  try {
    await connectDB();
    const article = new Article(articleData);
    await article.save();
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
} 