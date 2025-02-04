import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  readTime: String,
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  excerpt: String,
  image: String,
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  saves: {
    type: Number,
    default: 0
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Number,
    default: 0
  },
  link: String
}, {
  timestamps: true
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema); 