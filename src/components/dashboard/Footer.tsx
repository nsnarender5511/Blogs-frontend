"use client"

import React from 'react';
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className={cn(
      "py-6 border-t bg-background/60 backdrop-blur-xl mt-auto",
      "transition-all duration-200"
    )}>
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>© 2024 Blog Box.</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <span>Created with ❤️ by</span>
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Narender Singh
          </a>
        </div>
      </div>
    </footer>
  );
}; 