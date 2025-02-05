"use client"

import React from 'react';
import { useArticles } from '@/hooks/useArticles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { NavBar } from '@/components/layout/NavBar';

export default function PublisherDetailPage({ params }: { params: { id: string } }) {
  const { articles, isLoading, error } = useArticles();
  const publisherId = decodeURIComponent(params.id);

  const publisherArticles = React.useMemo(() => {
    if (!articles) return [];
    return articles.filter(article => article.author.name === publisherId);
  }, [articles, publisherId]);

  const publisher = publisherArticles[0]?.author;

  if (error) {
    return (
      <>
        <NavBar />
        <div className="flex-1 flex items-center justify-center min-h-screen pt-16">
          <p className="text-red-500">Error loading data: {error}</p>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="flex-1 flex items-center justify-center min-h-screen pt-16">
          <p className="text-muted-foreground">Loading publisher data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-20 min-h-screen">
        <div className="flex items-center gap-2 mb-8">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Publishers
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          {publisher && (
            <>
              <div className="h-12 w-12 rounded-full overflow-hidden bg-background border">
                <img
                  src={`https://icon.horse/icon/${new URL(publisher.avatar).hostname}`}
                  alt={publisher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=' + new URL(publisher.avatar).hostname;
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{publisher.name}</h1>
                <p className="text-muted-foreground">
                  {publisherArticles.length} article{publisherArticles.length !== 1 ? 's' : ''}
                </p>
              </div>
            </>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>
              All articles published by {publisherId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Publish Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Read Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Saves</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {publisherArticles.map((article) => (
                    <tr
                      key={article._id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <a 
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {article.title}
                        </a>
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(article.publishDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">{article.readTime} min</td>
                      <td className="p-4 align-middle">{article.saves}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 