"use client"

import React from 'react';
import { ArticleFeed } from './ArticleFeed';
import { Article } from './types';
import { SelectedFilters } from './SelectedFilters';

interface TabContentProps {
  currentTab: string;
  filteredArticles: Article[];
  selectedTags: string[];
  selectedAuthors: string[];
  onTagToggle: (tag: string) => void;
  onAuthorToggle: (author: string) => void;
  onClearFilters: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const TabContent: React.FC<TabContentProps> = ({
  currentTab,
  filteredArticles,
  selectedTags,
  selectedAuthors,
  onTagToggle,
  onAuthorToggle,
  onClearFilters,
  onRefresh,
  isLoading
}) => {
  switch (currentTab) {
    case "feed":
      return (
        <div className="relative">
          {(selectedTags.length > 0 || selectedAuthors.length > 0) && (
            <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b">
              <div className="py-2">
                <SelectedFilters
                  selectedTags={selectedTags}
                  selectedAuthors={selectedAuthors}
                  onTagToggle={onTagToggle}
                  onAuthorToggle={onAuthorToggle}
                  onClearAll={onClearFilters}
                />
              </div>
            </div>
          )}
          <div className="pt-2">
            <ArticleFeed 
              articles={filteredArticles} 
              onRefresh={onRefresh} 
              isLoading={isLoading}
            />
          </div>
        </div>
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