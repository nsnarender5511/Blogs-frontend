import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { toast } from 'sonner';

interface BookmarkedArticle {
  id: string;
  title: string;
  author: string;
  timestamp: number;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkedArticle[]>('article-bookmarks', []);

  const isBookmarked = useCallback((articleId: string) => {
    return bookmarks.some(bookmark => bookmark.id === articleId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((articleId: string, title: string, author: string) => {
    setBookmarks(prev => {
      const existingIndex = prev.findIndex(b => b.id === articleId);
      
      if (existingIndex >= 0) {
        const newBookmarks = prev.filter(b => b.id !== articleId);
        toast.success('Bookmark removed');
        return newBookmarks;
      } else {
        const newBookmark: BookmarkedArticle = {
          id: articleId,
          title,
          author,
          timestamp: Date.now()
        };
        toast.success('Article bookmarked');
        return [...prev, newBookmark];
      }
    });
  }, [setBookmarks]);

  const clearAllBookmarks = useCallback(async () => {
    setBookmarks([]);
    toast.success('All bookmarks cleared');
  }, [setBookmarks]);

  const getBookmarkCount = useCallback(() => {
    return bookmarks.length;
  }, [bookmarks]);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    clearAllBookmarks,
    getBookmarkCount
  };
};