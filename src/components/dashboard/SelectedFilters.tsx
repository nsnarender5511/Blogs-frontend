"use client"

import React from 'react';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SelectedFiltersProps {
  selectedTags: string[];
  selectedAuthors: string[];
  onTagToggle: (tag: string) => void;
  onAuthorToggle: (author: string) => void;
  onClearAll: () => void;
}

export const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  selectedTags,
  selectedAuthors,
  onTagToggle,
  onAuthorToggle,
  onClearAll
}) => {
  if (selectedTags.length === 0 && selectedAuthors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
            "bg-primary/10 text-primary hover:bg-primary/20",
            "transition-colors duration-200"
          )}
        >
          <span>{tag}</span>
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
      {selectedAuthors.map((author) => (
        <button
          key={author}
          onClick={() => onAuthorToggle(author)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
            "bg-primary/10 text-primary hover:bg-primary/20",
            "transition-colors duration-200"
          )}
        >
          <div className="h-4 w-4 rounded-full overflow-hidden bg-muted">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <span>{author}</span>
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
          "transition-colors duration-200"
        )}
      >
        Clear all
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}; 