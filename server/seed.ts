import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Article from './models/Article';

dotenv.config();

const seedData = [
  // Add some sample articles here
  {
    title: "Understanding React Performance",
    author: "Sarah Chen",
    readTime: "8 min",
    difficulty: "Intermediate",
    excerpt: "Deep dive into React rendering optimization and performance best practices",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "Performance", "Web Dev"],
    likes: 234,
    saves: 56,
    publishDate: new Date("2024-01-05"),
    comments: 45,
    link: "https://react.dev/learn/render-and-commit"
  },
  // Add more articles...
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Article.deleteMany({});
    await Article.insertMany(seedData);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 