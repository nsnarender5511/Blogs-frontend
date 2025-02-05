import { Article, RawArticle } from '@/types/article';
import { getRandomItem, getRandomItems, getRandomInt } from '@/utils/random';
import { articleApi } from './api';
import { DIFFICULTIES, SAMPLE_TAGS, Difficulty, Tag } from '@/constants/articles';

const extractMainDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Get the hostname (e.g., "www.databricks.com")
    const hostname = urlObj.hostname;
    // Remove 'www.' if present and get main domain
    const mainDomain = hostname.replace(/^www\./, '');
    return mainDomain;
  } catch (e) {
    return '';
  }
};

export const transformArticle = (article: RawArticle): Article => {
  const title = typeof article.title === 'object' && 'category' in article.title ? 
    article.title.category : 
    article.title || 'Untitled Article';

  const seed = parseInt(article._id.toString().slice(-8), 16);
  const authorName = article.publisher || 'Anonymous';
  
  // Get base URL for the favicon - use blog_url or link
  const baseUrl = article.blog_url || article.link;
  const mainDomain = extractMainDomain(baseUrl);
  const avatarUrl = `https://icon.horse/icon/${mainDomain}`;
  console.log("avatarUrl", avatarUrl);

  const readTime = article.readTime || getRandomInt(5, 25, seed);
  const difficulty = article.difficulty || getRandomItem([...DIFFICULTIES], seed) as Difficulty;
  const tags = article.tags || getRandomItems([...SAMPLE_TAGS], getRandomInt(1, 4, seed), seed) as Tag[];

  const validateAndFormatDate = (dateValue: string | Date | undefined): string => {
    if (!dateValue) {
      return new Date().toISOString();
    }
    
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  };

  const createdAtDate = validateAndFormatDate(article.created_at);
  const publishDate = validateAndFormatDate(article.date) || createdAtDate;

  return {
    _id: article._id.toString(),
    title,
    link: article.blog_url || article.link,
    image: article.image_url || undefined,
    readTime,
    difficulty,
    tags,
    excerpt: article.excerpt || article.additional_info || 'Explore this insightful article about technology and development.',
    content: article.content,
    author: {
      _id: article._id,
      name: authorName,
      avatar: avatarUrl
    },
    publishDate,
    saves: article.saves || getRandomInt(1, 100, seed)
  };
};

export const articleService = {
  async fetchArticles(): Promise<Article[]> {
    try {
      const rawArticles = await articleApi.fetchArticles();
      return rawArticles.map(transformArticle);
    } catch (error) {
      throw error;
    }
  }
}; 