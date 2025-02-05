"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedTags.map((tag) => (
        <Button
          key={tag}
          variant="secondary"
          size="sm"
          className="h-7 gap-1 pr-2 text-xs"
          onClick={() => onTagToggle(tag)}
        >
          {tag}
          <X className="h-3 w-3" />
        </Button>
      ))}
      {selectedAuthors.map((author) => (
        <Button
          key={author}
          variant="secondary"
          size="sm"
          className="h-7 gap-1 pr-2 text-xs"
          onClick={() => onAuthorToggle(author)}
        >
          {author}
          <X className="h-3 w-3" />
        </Button>
      ))}
      {(selectedTags.length > 0 || selectedAuthors.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  );
}; 