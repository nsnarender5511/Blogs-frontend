"use client"

import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import { Article } from '@/types/article';

interface ArticleFeedProps {
  articles: Article[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export const ArticleFeed: React.FC<ArticleFeedProps> = ({ 
  articles, 
  onRefresh,
  isLoading = false 
}) => {
  // Group articles into three columns with balanced heights
  const groupedArticles = React.useMemo(() => {
    const columns: Article[][] = [[], [], []];
    let columnHeights = [0, 0, 0];
    
    // Create a copy of articles array to avoid mutating the original
    const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);
    
    shuffledArticles.forEach((article) => {
      // Calculate estimated height (can be adjusted based on content)
      const estimatedHeight = article.image ? 3 : 1;
      
      // Find the column with minimum height
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Add article to the shortest column
      columns[minHeightIndex].push(article);
      columnHeights[minHeightIndex] += estimatedHeight;
    });
    
    return columns;
  }, [articles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {groupedArticles.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((article, index) => (
              <motion.div
                key={`${article._id}-${columnIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <ArticleCard 
                  article={article} 
                  index={index} 
                  variant="full"
                />
              </motion.div>
            ))}
          </div>
        ))}
        {articles.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No articles found with the selected tags.</p>
            <Button 
              variant="outline" 
              onClick={onRefresh}
              className="gap-2"
            >
              Try refreshing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 