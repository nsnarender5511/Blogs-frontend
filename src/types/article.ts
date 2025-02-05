export interface Author {
  name: string;
  avatar: string;
}

export interface Article {
  _id: string;
  title: string;
  link: string;
  image: string | null;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  createdAt: string;
  excerpt: string;
  author: Author;
  publishDate: string;
  saves: number;
}

export interface RawArticle {
  _id: any;
  title: string | { category: string };
  blog_url?: string;
  image_url?: string;
  created_at: string | Date;
  additional_info?: string;
  authors?: string[];
  date?: string | Date;
} 