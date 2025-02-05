import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface HistoryItem {
  id: number;
  title: string;
  progress: number;
  lastRead: string;
  timeSpent: string;
  image?: string;
}

interface ReadingHistoryProps {
  items: HistoryItem[];
}

export function ReadingHistory({ items }: ReadingHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Reading History</CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.timeSpent}</span>
                </div>
                <span>•</span>
                <span>
                  Last read {formatDistanceToNow(new Date(item.lastRead))} ago
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={item.progress} className="flex-1 h-1.5" />
                <span className="text-xs font-medium">{item.progress}%</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 