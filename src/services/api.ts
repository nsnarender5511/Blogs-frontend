import { Article } from '@/types/article';

// API service for articles
export const articleApi = {
  async fetchArticles(): Promise<Article[]> {
    try {
      const response = await fetch('/api/articles');
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return responseData;
    } catch (error) {
      throw error;
    }
  },

  async createArticle(article: Omit<Article, '_id'>): Promise<Article> {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create article');
      }
      
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}; 