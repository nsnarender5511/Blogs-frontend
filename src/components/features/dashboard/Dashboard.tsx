"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { NavBar, Sidebar, Footer } from '@/components/layout';
import { TabContent } from './TabContent';
import { cn } from '@/lib/utils';
import { useArticles } from '@/hooks/useArticles';
import { SAMPLE_TAGS } from '@/constants/articles';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("feed");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const {
    displayedArticles,
    selectedTags,
    selectedAuthors,
    isLoading,
    handleTagToggle,
    handleAuthorToggle,
    handleRefresh,
    handleClearFilters,
    articles,
    handleSearch,
    searchQuery,
    loadMore,
    hasMore,
    isLoadingMore
  } = useArticles();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarContent = (
    <Sidebar 
      currentTab={currentTab} 
      onTabChange={(tab) => {
        setCurrentTab(tab);
        if (isMobile) setIsSidebarOpen(false);
      }}
      selectedTags={selectedTags}
      onTagToggle={handleTagToggle}
      selectedAuthors={selectedAuthors}
      onAuthorToggle={handleAuthorToggle}
      articles={articles}
      tags={SAMPLE_TAGS}
      isMobile={isMobile}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <NavBar onSearch={handleSearch} />
      
      {/* Mobile Sidebar Sheet */}
      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-4 top-20 z-40 md:hidden"
              aria-label="Open sidebar menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      )}
      
      {/* Desktop Sidebar */}
      {!isMobile && sidebarContent}
      
      <main className={cn(
        "min-h-screen transition-all duration-200 flex flex-col pt-16",
        !isMobile && "md:pl-[240px]"
      )}>
        <div className="container mx-auto px-4 flex-1">
          <TabContent
            currentTab={currentTab}
            filteredArticles={displayedArticles}
            selectedTags={selectedTags}
            selectedAuthors={selectedAuthors}
            onTagToggle={handleTagToggle}
            onAuthorToggle={handleAuthorToggle}
            onClearFilters={handleClearFilters}
            onRefresh={handleRefresh}
            isLoading={isLoading}
            loadMore={loadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
};