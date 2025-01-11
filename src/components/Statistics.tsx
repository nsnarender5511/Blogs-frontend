import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Trophy, TrendingUp } from "lucide-react";

interface StatProps {
  stats: {
    totalArticles: number;
    totalTimeSpent: string;
    averageDaily: string;
    completionRate: number;
    weeklyStreak: number;
    topCategories: Array<{
      name: string;
      percentage: number;
    }>;
  };
}

export function Statistics({ stats }: StatProps) {
  const statCards = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: BookOpen,
      description: "Articles read this month",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Time Spent",
      value: stats.totalTimeSpent,
      icon: Clock,
      description: "Total reading time",
      trend: "+5.2%",
      trendUp: true
    },
    {
      title: "Weekly Streak",
      value: stats.weeklyStreak,
      icon: Trophy,
      description: "Consecutive weeks",
      trend: "On track",
      trendUp: true
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      description: "Article completion",
      trend: "-2.1%",
      trendUp: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1">
                <div
                  className={`h-full ${
                    stat.trendUp ? 'bg-green-500' : 'bg-red-500'
                  } opacity-20`}
                  style={{
                    width: `${Math.random() * 40 + 60}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reading Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.topCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category.name}</span>
                <span className="text-muted-foreground">{category.percentage}%</span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 