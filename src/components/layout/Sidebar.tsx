"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  History,
  Tags,
  ChevronLeft,
  Check,
  User,
  Code2,
  Blocks,
  Database,
  Layout,
  Brain,
  FlaskConical,
  Cloud,
  Cog,
  LucideProps
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Article } from './types';
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedAuthors: string[];
  onAuthorToggle: (author: string) => void;
  articles: Article[];
  tags: readonly string[];
  userProfile?: {
    name: string;
    image?: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab,
  onTabChange,
  selectedTags,
  onTagToggle,
  selectedAuthors = [],
  onAuthorToggle = () => {},
  articles,
  tags,
  userProfile = { name: "User" }
}) => {
  const [isTagsExpanded, setIsTagsExpanded] = React.useState(true);
  const [isAuthorsExpanded, setIsAuthorsExpanded] = React.useState(false);
  const [showAllTags, setShowAllTags] = React.useState(false);
  const [showAllAuthors, setShowAllAuthors] = React.useState(false);

  const getTagCount = (tag: string) => {
    return articles.filter(article => article.tags.includes(tag)).length;
  };

  const getAuthorCount = (authorName: string) => {
    return articles.filter(article => article.author.name === authorName).length;
  };

  const uniqueAuthors = React.useMemo(() => {
    const authors = articles.map(article => article.author.name);
    return [...new Set(authors)].sort();
  }, [articles]);

  const getTagIcon = (tag: string) => {
    const icons: { [key: string]: React.ComponentType<LucideProps> } = {
      'Web Dev': Code2,
      'Architecture': Blocks,
      'Backend': Database,
      'Frontend': Layout,
      'AI': Brain,
      'ML': FlaskConical,
      'DevOps': Cog,
      'Cloud': Cloud
    };
    const Icon = icons[tag] || Tags;
    return (props: LucideProps) => <Icon {...props} />;
  };

  const tabs = [
    {
      value: "feed",
      label: "Feed",
      icon: LayoutDashboard,
      isNew: true
    },
    {
      value: "trending",
      label: "Trending",
      icon: TrendingUp
    },
    {
      value: "following",
      label: "Following",
      icon: Users
    },
    {
      value: "history",
      label: "History",
      icon: History
    }
  ];

  const INITIAL_ITEMS_TO_SHOW = 5;

  const visibleTags = showAllTags ? tags : tags.slice(0, INITIAL_ITEMS_TO_SHOW);
  const visibleAuthors = showAllAuthors ? uniqueAuthors : uniqueAuthors.slice(0, INITIAL_ITEMS_TO_SHOW);

  const hasMoreTags = tags.length > INITIAL_ITEMS_TO_SHOW;
  const hasMoreAuthors = uniqueAuthors.length > INITIAL_ITEMS_TO_SHOW;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[240px] bg-background/60 backdrop-blur-xl border-r transition-all duration-200 ease-out flex flex-col">
      <ScrollArea className="flex-none py-2">
        <nav className="flex flex-col gap-1 px-2">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={currentTab === tab.value ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 px-4 transition-all duration-200"
              onClick={() => onTabChange(tab.value)}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.isNew && (
                <span className="absolute right-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary animate-pulse">
                  New
                </span>
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-4">
          {/* Tags Filter */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between px-4 mb-2"
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            >
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4" />
                <span>Filter by Tags</span>
              </div>
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform",
                isTagsExpanded ? "rotate-90" : "-rotate-90"
              )} />
            </Button>

            <motion.div
              initial={false}
              animate={{ height: isTagsExpanded ? "auto" : 0, opacity: isTagsExpanded ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-2">
                {visibleTags.map((tag) => {
                  const count = getTagCount(tag);
                  const isSelected = selectedTags.includes(tag);
                  const TagIcon = getTagIcon(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      disabled={count === 0}
                      className={cn(
                        "flex items-center justify-between py-1.5 px-2 rounded-md",
                        "text-sm transition-colors duration-200",
                        "hover:bg-muted/80",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        count === 0 && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors duration-200",
                          isSelected 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-muted-foreground/30"
                        )}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{tag}</span>
                      </div>
                      <span className="text-xs text-muted-foreground min-w-[1.5rem] text-center">
                        {count}
                      </span>
                    </button>
                  );
                })}
                {hasMoreTags && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-1 text-xs text-muted-foreground hover:text-primary"
                    onClick={() => setShowAllTags(!showAllTags)}
                  >
                    {showAllTags ? 'Show Less' : `Show ${tags.length - INITIAL_ITEMS_TO_SHOW} More`}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Authors Filter */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between px-4 mb-2"
              onClick={() => setIsAuthorsExpanded(!isAuthorsExpanded)}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Filter by Authors</span>
              </div>
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform",
                isAuthorsExpanded ? "rotate-90" : "-rotate-90"
              )} />
            </Button>

            <motion.div
              initial={false}
              animate={{ height: isAuthorsExpanded ? "auto" : 0, opacity: isAuthorsExpanded ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-2">
                {visibleAuthors.map((author) => {
                  const count = getAuthorCount(author);
                  const isSelected = selectedAuthors.includes(author);
                  return (
                    <button
                      key={author}
                      onClick={() => onAuthorToggle(author)}
                      disabled={count === 0}
                      className={cn(
                        "flex items-center justify-between py-1.5 px-2 rounded-md",
                        "text-sm transition-colors duration-200",
                        "hover:bg-muted/80",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        count === 0 && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors duration-200",
                          isSelected 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-muted-foreground/30"
                        )}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div className="h-4 w-4 rounded-full overflow-hidden bg-muted">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`}
                            alt={author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground min-w-[1.5rem] text-center">
                        {count}
                      </span>
                    </button>
                  );
                })}
                {hasMoreAuthors && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-1 text-xs text-muted-foreground hover:text-primary"
                    onClick={() => setShowAllAuthors(!showAllAuthors)}
                  >
                    {showAllAuthors ? 'Show Less' : `Show ${uniqueAuthors.length - INITIAL_ITEMS_TO_SHOW} More`}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}; 