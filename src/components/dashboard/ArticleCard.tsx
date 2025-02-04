"use client"

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, Clock, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from './types';
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  index: number;
  variant?: 'compact' | 'full';
}

const getDifficultyBadge = (difficulty: Article['difficulty']) => {
  const badges = {
    beginner: { text: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    intermediate: { text: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    advanced: { text: 'Advanced', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
  };
  return badges[difficulty];
};

const getTagColor = (tag: string) => {
  const colors: { [key: string]: string } = {
    React: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Performance: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'Web Dev': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    AI: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    Technology: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    Future: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    Architecture: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    Backend: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    Design: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    ML: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'Data Science': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  };
  return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  index,
  variant = 'full'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const badge = getDifficultyBadge(article.difficulty);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, Math.min(50 * index, 300));

    return () => clearTimeout(timer);
  }, [index]);

  const CompactCard = () => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group bg-muted/50">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(article.publishDate), { addSuffix: true })}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
            {badge.text}
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            {article.excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {article.readTime} min
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FullCard = () => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
              {badge.text}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(article.publishDate), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min read
            </div>
          </div>
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300 gap-1 rounded-full group/btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <BookMarked className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="font-medium group-hover/btn:text-primary">{article.saves}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        {variant === 'compact' ? <CompactCard /> : <FullCard />}
      </a>
    </motion.div>
  );
}; 