import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import Article from '../models/Article';
import { recommendedArticles } from '../data/mockData'; // Move your existing mock data to a separate file
import config from '../config';

// Ensure environment variables are loaded
dotenv.config();

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    const db = await connectToDatabase();
    
    console.log('Clearing existing articles...');
    const collection = db.collection('articles');
    await collection.deleteMany({});
    
    console.log('Inserting new articles...');
    await collection.insertMany(recommendedArticles.map(article => ({
      ...article,
      publishDate: new Date(article.publishDate)
    })));
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Only run seed if we're in development
if (config.isDevelopment) {
  seed();
} else {
  console.log('Seeding is only available in development environment');
  process.exit(0);
} 