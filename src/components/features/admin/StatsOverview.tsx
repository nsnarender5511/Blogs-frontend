import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building2 } from 'lucide-react';

interface StatsOverviewProps {
  totalArticles: number;
  totalPublishers: number;
  averageArticles: number;
}

export function StatsOverview({ totalArticles, totalPublishers, averageArticles }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArticles}</div>
          <p className="text-xs text-muted-foreground">Total published articles</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Publishers</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPublishers}</div>
          <p className="text-xs text-muted-foreground">Active publishers</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Articles</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageArticles}</div>
          <p className="text-xs text-muted-foreground">Articles per publisher</p>
        </CardContent>
      </Card>
    </div>
  );
} 