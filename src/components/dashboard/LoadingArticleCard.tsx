"use client"

import { Card, CardContent } from "@/components/ui/card"

export const LoadingArticleCard = () => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video overflow-hidden bg-muted animate-pulse" />
          <div className="absolute top-2 right-2">
            <div className="w-20 h-6 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-20 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 