export interface Author {
  _id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishDate: string;
  readTime: number;
  image?: string;
  link: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  saves: number;
}

export interface RawArticle {
  _id: string;
  title: string | { category: string };
  excerpt: string;
  content: string;
  publisher?: string;
  link: string;
  blog_url?: string;
  image_url?: string;
  created_at?: string;
  date?: string;
  additional_info?: string;
  readTime?: number;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  saves?: number;
} 