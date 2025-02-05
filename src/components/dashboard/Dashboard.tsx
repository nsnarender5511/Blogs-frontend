"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { articleApi } from '@/services/api';
import { getRandomItem, getRandomItems, getRandomInt, shuffleArray } from '@/utils/random';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';
import { TabContent } from './TabContent';
import { Footer } from './Footer';
import { Article } from './types';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("feed");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { theme } = useTheme();

  const sampleTags = ['Web Dev', 'Architecture', 'Backend', 'Frontend', 'AI', 'ML', 'DevOps', 'Cloud'];

  const transform_article = (articles: any[]) => {
    const difficulties: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
    
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
        setFilteredArticles(randomizedArticles);
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

  useEffect(() => {
    if (selectedTags.length === 0 && selectedAuthors.length === 0) {
      setFilteredArticles(recommendedArticles);
    } else {
      const filtered = recommendedArticles.filter(article => {
        const matchesTags = selectedTags.length === 0 || 
          article.tags.some(tag => selectedTags.includes(tag));
        const matchesAuthors = selectedAuthors.length === 0 || 
          selectedAuthors.includes(article.author.name);
        return matchesTags && matchesAuthors;
      });
      setFilteredArticles(filtered);
    }
  }, [selectedTags, selectedAuthors, recommendedArticles]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAuthorToggle = (author: string) => {
    setSelectedAuthors(prev => 
      prev.includes(author)
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  };

  const handleRefresh = () => {
    setIsLoading(true);
    const randomizedArticles = shuffleArray([...recommendedArticles], Date.now());
    setRecommendedArticles(randomizedArticles);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedAuthors([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        isSidebarCollapsed={isSidebarCollapsed}
        onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        selectedAuthors={selectedAuthors}
        onAuthorToggle={handleAuthorToggle}
        articles={recommendedArticles}
        tags={sampleTags}
        isCollapsed={isSidebarCollapsed}
      />
      <main className={cn(
        "min-h-screen transition-all duration-200 flex flex-col pt-16",
        isSidebarCollapsed ? "pl-[60px]" : "pl-[240px]"
      )}>
        <div className="container mx-auto px-4 flex-1">
          <TabContent
            currentTab={currentTab}
            filteredArticles={filteredArticles}
            selectedTags={selectedTags}
            selectedAuthors={selectedAuthors}
            onTagToggle={handleTagToggle}
            onAuthorToggle={handleAuthorToggle}
            onClearFilters={handleClearFilters}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;