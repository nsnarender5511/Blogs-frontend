import React from 'react';
import { useArticles } from '@/hooks/useArticles';
import { StatsOverview } from './StatsOverview';
import { PublishersTable } from './PublishersTable';

interface PublisherStat {
  name: string;
  count: number;
  domain: string;
  rank: number;
  percentage: number;
}

const extractMainDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    return hostname.replace(/^www\./, '');
  } catch (e) {
    return '';
  }
};

export function AdminDashboard() {
  const { articles, isLoading, error } = useArticles();

  // Calculate publisher stats
  const publisherStats = React.useMemo(() => {
    if (!articles || articles.length === 0) {
      return [];
    }

    const stats = new Map<string, { name: string; count: number; domain: string }>();
    
    articles.forEach((article, index) => {
      if (!article.author) {
        console.warn(`Article ${index} missing author:`, article);
        return;
      }
      
      const publisher = article.author.name;
      const domain = extractMainDomain(article.link);
      
      if (!stats.has(publisher)) {
        stats.set(publisher, {
          name: publisher,
          count: 1,
          domain
        });
      } else {
        const current = stats.get(publisher)!;
        stats.set(publisher, {
          ...current,
          count: current.count + 1
        });
      }
    });

    const result = Array.from(stats.values())
      .map((stat, index) => ({
        ...stat,
        rank: index + 1,
        percentage: Number(((stat.count / articles.length) * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count);

    return result;
  }, [articles]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Error loading data: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading publishers data...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Publishers Overview</h2>
      </div>

      <StatsOverview 
        totalArticles={articles?.length || 0}
        totalPublishers={publisherStats.length}
        averageArticles={publisherStats.length ? Number((articles!.length / publisherStats.length).toFixed(1)) : 0}
      />

      <PublishersTable publishers={publisherStats} />
    </div>
  );
} 