"use client"

import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import { LoadingArticleCard } from './LoadingArticleCard';
import { Article } from './types';

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
  // Group articles into three columns
  const groupedArticles = React.useMemo(() => {
    const columns: Article[][] = [[], [], []];
    let columnIndex = 0;
    
    // Create a copy of articles array to avoid mutating the original
    const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);
    
    shuffledArticles.forEach((article) => {
      // Add article to current column and move to next
      columns[columnIndex].push(article);
      // If article has image, skip next two columns
      columnIndex = article.image ? 
        (columnIndex + 3) % 3 : // Move to same column for next article
        (columnIndex + 1) % 3;  // Move to next column
    });
    
    return columns;
  }, [articles]);

  return (
    <div className="space-y-8">

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={`loading-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={index % 3 === 0 ? "col-span-3" : "col-span-1"}
            >
              <LoadingArticleCard />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groupedArticles.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((article, index) => (
                <motion.div
                  key={`${article._id}-${columnIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={article.image ? "col-span-3" : ""}
                >
                  <ArticleCard 
                    article={article} 
                    index={index} 
                    variant={article.image ? 'full' : 'compact'}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 