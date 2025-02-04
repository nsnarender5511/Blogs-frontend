"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  History,
  MenuIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab,
  onTabChange
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

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

  return (
    <div
      className={cn(
        "border-r bg-background/60 backdrop-blur-xl h-[calc(100vh-4rem)]",
        "transition-all duration-200 ease-out",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 truncate">
            RediGNN
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full shrink-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <MenuIcon className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex flex-col gap-1 p-2">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={currentTab === tab.value ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 relative transition-all duration-200",
              isCollapsed ? "px-2" : "px-4"
            )}
            onClick={() => onTabChange(tab.value)}
          >
            <tab.icon className="h-4 w-4 shrink-0" />
            <span className={cn(
              "transition-all duration-200",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              {tab.label}
            </span>
            {!isCollapsed && tab.isNew && (
              <span className="absolute right-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary animate-pulse">
                New
              </span>
            )}
          </Button>
        ))}
      </nav>
    </div>
  );
}; 