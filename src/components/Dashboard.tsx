"use client"

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { articleApi } from '@/services/api';
import { getRandomItem, getRandomItems, getRandomInt, shuffleArray } from '@/utils/random';
import { NavBar } from './dashboard/NavBar';
import { ArticleFeed } from './dashboard/ArticleFeed';
import { Article } from './dashboard/types';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
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
        image: article.image_url || getRandomFallbackImage(),
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
    // Simulate loading time for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <NavBar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          <Tabs defaultValue="feed" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList className="p-1 bg-muted/50 backdrop-blur-sm rounded-full border border-muted/20">
                <TabsTrigger 
                  value="feed" 
                  className="relative data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
                >
                  <span>Feed</span>
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary animate-pulse">
                    New
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="trending" 
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
                >
                  Trending
                </TabsTrigger>
                <TabsTrigger 
                  value="following" 
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
                >
                  Following
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
                >
                  History
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="feed" className="mt-6 focus-visible:outline-none">
              <ArticleFeed 
                articles={recommendedArticles} 
                onRefresh={handleRefresh} 
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="trending" className="mt-6 focus-visible:outline-none">
              <div className="text-center text-muted-foreground">
                Trending content coming soon...
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-6 focus-visible:outline-none">
              <div className="text-center text-muted-foreground">
                Following feed coming soon...
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6 focus-visible:outline-none">
              <div className="text-center text-muted-foreground">
                Reading history coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;