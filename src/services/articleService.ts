import { Article, RawArticle } from '@/types/article';
import { getRandomItem, getRandomItems, getRandomInt } from '@/utils/random';
import { articleApi } from './api';
import { DIFFICULTIES, SAMPLE_TAGS, Difficulty, Tag } from '@/constants/articles';

export const transformArticle = (article: RawArticle): Article => {
  const title = typeof article.title === 'object' ? 
    article.title.category || article.title.toString() : 
    article.title || 'Untitled Article';

  const seed = parseInt(article._id.toString().slice(-8), 16);

  const authorName = Array.isArray(article.authors) && article.authors.length > 0 ? 
    article.authors[0].toString() : 
    'Anonymous Author';

  const avatarSeed = Array.isArray(article.authors) && article.authors.length > 0 ? 
    article.authors[0].toString() : 
    'anonymous';

  const randomReadTime = getRandomInt(5, 25, seed);
  const randomDifficulty = getRandomItem([...DIFFICULTIES], seed) as Difficulty;
  const randomTags = getRandomItems([...SAMPLE_TAGS], getRandomInt(1, 4, seed), seed) as Tag[];

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
    link: article.blog_url || '#',
    image: article.image_url || null,
    readTime: randomReadTime,
    difficulty: randomDifficulty,
    tags: randomTags,
    createdAt: createdAtDate,
    excerpt: typeof article.additional_info === 'string' ? 
      article.additional_info : 
      'Explore this insightful article about technology and development.',
    author: {
      name: authorName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`
    },
    publishDate,
    saves: getRandomInt(1, 100, seed)
  };
};

export const articleService = {
  async fetchArticles(): Promise<Article[]> {
    try {
      const rawArticles = await articleApi.fetchArticles() as unknown as RawArticle[];
      return rawArticles.map(transformArticle);
    } catch (error) {
      throw error;
    }
  }
}; 