"use client"

import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { NavBar, Sidebar, Footer } from '@/components/layout';
import { TabContent } from './TabContent';
import { cn } from '@/lib/utils';
import { useArticles } from '@/hooks/useArticles';
import { SAMPLE_TAGS } from '@/constants/articles';

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("feed");
  const { theme } = useTheme();
  const {
    filteredArticles,
    selectedTags,
    selectedAuthors,
    isLoading,
    handleTagToggle,
    handleAuthorToggle,
    handleRefresh,
    handleClearFilters,
    articles
  } = useArticles();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        selectedAuthors={selectedAuthors}
        onAuthorToggle={handleAuthorToggle}
        articles={articles}
        tags={SAMPLE_TAGS}
      />
      <main className={cn(
        "min-h-screen transition-all duration-200 flex flex-col pt-16 pl-[240px]"
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