"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Search, Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { UserNav } from "@/components/UserNav";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="fixed top-0 z-50 w-full border-b glass-effect backdrop-blur-lg bg-background/80">
      <div className="container mx-auto h-16">
        <div className="flex h-full items-center justify-between gap-4">
          {/* Left section - Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-primary/10"
              >
                <Layout className="h-5 w-5 text-primary" />
              </motion.div>
              <motion.h2 
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 cursor-pointer relative group hidden sm:block"
                whileHover={{ scale: 1.02 }}
              >
                RediGNN
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300"></span>
              </motion.h2>
            </div>
          </div>

          {/* Middle section - Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <Input
                type="text"
                placeholder="Search articles, topics, or tags..."
                className="w-full h-9 pl-9 pr-4 glass-effect transition-all duration-300 border-muted/50 focus:border-primary/50 hover:border-primary/30 focus:ring-2 focus:ring-primary/20 rounded-full bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-2 bg-background/95 backdrop-blur-lg rounded-lg border shadow-lg z-50"
                  >
                    <div className="text-sm text-muted-foreground p-2 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                      />
                      Searching for "{searchQuery}"...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-primary/10 transition-all duration-300 group"
            >
              <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
              <span className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Button>
            <ModeToggle />
            <div className="h-6 w-px bg-border/50"></div>
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
}; 