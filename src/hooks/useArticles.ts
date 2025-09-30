import { useState, useEffect, useCallback, useMemo } from 'react';
import { Article } from '@/types/article';
import { articleService } from '@/services/articleService';
import { shuffleArray } from '@/utils/random';

interface UseArticlesReturn {
  articles: Article[];
  filteredArticles: Article[];
  displayedArticles: Article[];
  isLoading: boolean;
  error: string | null;
  selectedTags: string[];
  selectedAuthors: string[];
  searchQuery: string;
  handleTagToggle: (tag: string) => void;
  handleAuthorToggle: (author: string) => void;
  handleRefresh: () => void;
  handleClearFilters: () => void;
  handleSearch: (query: string) => void;
  searchResults: Article[];
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  currentPage: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 12;

export const useArticles = (): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    
    const query = searchQuery.toLowerCase();
    return articles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(query);
      const excerptMatch = article.excerpt?.toLowerCase().includes(query) || false;
      const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(query));
      const authorMatch = article.author.name.toLowerCase().includes(query);
      
      return titleMatch || excerptMatch || tagsMatch || authorMatch;
    });
  }, [searchQuery, articles]);

  useEffect(() => {
    const baseArticles = searchQuery ? searchResults : articles;
    
    if (selectedTags.length === 0 && selectedAuthors.length === 0) {
      setFilteredArticles(baseArticles);
    } else {
      const filtered = baseArticles.filter(article => {
        const matchesTags = selectedTags.length === 0 || 
          article.tags.some(tag => selectedTags.includes(tag));
        const matchesAuthors = selectedAuthors.length === 0 || 
          selectedAuthors.includes(article.author.name);
        return matchesTags && matchesAuthors;
      });
      setFilteredArticles(filtered);
    }
    setCurrentPage(1);
  }, [selectedTags, selectedAuthors, articles, searchQuery, searchResults]);

  useEffect(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    setDisplayedArticles(filteredArticles.slice(0, endIndex));
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const hasMore = currentPage < totalPages;

  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoadingMore(false);
      }, 500);
    }
  }, [hasMore, isLoadingMore]);

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
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    articles,
    filteredArticles,
    displayedArticles,
    isLoading,
    error,
    selectedTags,
    selectedAuthors,
    searchQuery,
    handleTagToggle,
    handleAuthorToggle,
    handleRefresh,
    handleClearFilters,
    handleSearch,
    searchResults,
    loadMore,
    hasMore,
    isLoadingMore,
    currentPage,
    totalPages
  };
}; 