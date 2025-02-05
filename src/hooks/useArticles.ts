import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types/article';
import { articleService } from '@/services/articleService';
import { shuffleArray } from '@/utils/random';

interface UseArticlesReturn {
  articles: Article[];
  filteredArticles: Article[];
  isLoading: boolean;
  error: string | null;
  selectedTags: string[];
  selectedAuthors: string[];
  handleTagToggle: (tag: string) => void;
  handleAuthorToggle: (author: string) => void;
  handleRefresh: () => void;
  handleClearFilters: () => void;
}

export const useArticles = (): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const fetchedArticles = await articleService.fetchArticles();
      console.log("fetchedArticles :: ", fetchedArticles);
      const randomizedArticles = shuffleArray(fetchedArticles, Date.now());
      setArticles(randomizedArticles);
      setFilteredArticles(randomizedArticles);
      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to fetch articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0 && selectedAuthors.length === 0) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article => {
        const matchesTags = selectedTags.length === 0 || 
          article.tags.some(tag => selectedTags.includes(tag));
        const matchesAuthors = selectedAuthors.length === 0 || 
          selectedAuthors.includes(article.author.name);
        return matchesTags && matchesAuthors;
      });
      setFilteredArticles(filtered);
    }
  }, [selectedTags, selectedAuthors, articles]);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const handleAuthorToggle = useCallback((author: string) => {
    setSelectedAuthors(prev => 
      prev.includes(author)
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    const randomizedArticles = shuffleArray([...articles], Date.now());
    setArticles(randomizedArticles);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [articles]);

  const handleClearFilters = useCallback(() => {
    setSelectedTags([]);
    setSelectedAuthors([]);
  }, []);

  return {
    articles,
    filteredArticles,
    isLoading,
    error,
    selectedTags,
    selectedAuthors,
    handleTagToggle,
    handleAuthorToggle,
    handleRefresh,
    handleClearFilters
  };
}; 