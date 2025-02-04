export interface Article {
  _id: string;
  title: string;
  link: string;
  image: string;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  createdAt: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  saves: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  duration: string;
  speaker: string;
  attendees: number;
  type: string;
  image: string;
}

export interface ReadingHistoryItem {
  id: number;
  title: string;
  progress: number;
  lastRead: string;
  timeSpent: string;
  image: string;
}

export interface Board {
  id: number;
  title: string;
  description: string;
  articleCount: number;
  color: string;
  icon: any; // TODO: Replace with proper icon type
}

export interface ReadingStats {
  totalArticles: number;
  totalTimeSpent: string;
  averageDaily: string;
  completionRate: number;
  weeklyStreak: number;
  topCategories: Array<{
    name: string;
    percentage: number;
  }>;
} 