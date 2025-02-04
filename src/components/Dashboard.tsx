"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { articleApi } from '@/services/api';
import { getRandomItem, getRandomItems, getRandomInt, shuffleArray } from '@/utils/random';
import { NavBar } from './dashboard/NavBar';
import { Sidebar } from './dashboard/Sidebar';
import { ArticleFeed } from './dashboard/ArticleFeed';
import { Article } from './dashboard/types';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("feed");
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";

  const fallbackImages = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1000",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1000",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"
  ];

  const getRandomFallbackImage = () => {
    return getRandomItem(fallbackImages);
  };

  const transform_article = (articles: any[]) => {
    const difficulties: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
    const sampleTags = ['Web Dev', 'Architecture', 'Backend', 'Frontend', 'AI', 'ML', 'DevOps', 'Cloud'];
    
    return articles.map((article) => {
      const title = typeof article.title === 'object' ? 
        article.title.category || article.title.toString() : 
        article.title || 'Untitled Article';

      const seed = parseInt(article._id.toString().slice(-8), 16);

      return {
        _id: article._id.toString(),
        title: title,
        link: article.blog_url || '#',
        image: article.image_url || null,
        readTime: getRandomInt(5, 25, seed),
        difficulty: getRandomItem(difficulties, seed),
        tags: getRandomItems(sampleTags, getRandomInt(1, 4, seed), seed),
        createdAt: new Date(article.created_at).toISOString(),
        excerpt: typeof article.additional_info === 'string' ? 
          article.additional_info : 
          'Explore this insightful article about technology and development.',
        author: {
          name: Array.isArray(article.authors) && article.authors.length > 0 ? 
            article.authors[0].toString() : 
            'Anonymous Author',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${
            Array.isArray(article.authors) && article.authors.length > 0 ? 
              article.authors[0].toString() : 
              'anonymous'
          }`
        },
        publishDate: article.date ? 
          new Date(article.date).toISOString() : 
          new Date(article.created_at).toISOString(),
        saves: getRandomInt(1, 100, seed)
      };
    });
  };

  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      try {
        setIsLoading(true);
        const articles = await articleApi.fetchArticles();
        const transformedArticles = transform_article(articles);
        const randomizedArticles = shuffleArray(transformedArticles, Date.now());
        setRecommendedArticles(randomizedArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedArticles();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    const randomizedArticles = shuffleArray([...recommendedArticles], Date.now());
    setRecommendedArticles(randomizedArticles);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "feed":
        return (
          <ArticleFeed 
            articles={recommendedArticles} 
            onRefresh={handleRefresh} 
            isLoading={isLoading}
          />
        );
      case "trending":
        return (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-muted-foreground">Trending content coming soon...</p>
          </div>
        );
      case "following":
        return (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-muted-foreground">Following feed coming soon...</p>
          </div>
        );
      case "history":
        return (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-muted-foreground">Reading history coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <div className="pt-16 flex">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
        <main className="flex-1 overflow-auto min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto py-6 px-4 md:px-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;