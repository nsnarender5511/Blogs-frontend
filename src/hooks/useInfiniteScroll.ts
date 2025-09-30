import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  callback: () => void;
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  loading,
  threshold = 100
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    if (!hasMore || !node) return;
    
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          callback();
        }
      },
      {
        rootMargin: `${threshold}px`
      }
    );
    
    observerRef.current.observe(node);
  }, [callback, hasMore, loading, threshold]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return loadMoreRef;
};