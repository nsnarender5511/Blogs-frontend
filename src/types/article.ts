export interface Article {
  _id: string;
  title: string;
  blog_url?: string;
  image_url?: string;
  created_at: string | Date;
  additional_info?: string;
  authors?: string[];
  date?: string | Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: string | number;
  tags: string[];
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string | Date;
  saves: number;
  link: string;
} 