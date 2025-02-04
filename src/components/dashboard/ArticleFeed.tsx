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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10 transition-colors"
          onClick={onRefresh}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear" }}
              className="p-2"
            >
              <ArrowRight className="h-4 w-4 transform rotate-45" />
            </motion.div>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={`loading-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <LoadingArticleCard />
            </motion.div>
          ))
        ) : (
          // Show actual articles
          articles.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))
        )}
      </div>
    </div>
  );
}; 