import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, ThumbsUp, Bookmark } from "lucide-react";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'comment' | 'like' | 'bookmark' | 'read';
}

const activities: ActivityItem[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SC'
    },
    action: 'commented on',
    target: 'Understanding React Performance',
    timestamp: '5m ago',
    type: 'comment'
  },
  {
    id: '2',
    user: {
      name: 'Alex Morgan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      initials: 'AM'
    },
    action: 'liked',
    target: 'GraphQL Best Practices',
    timestamp: '15m ago',
    type: 'like'
  },
  // Add more activities...
];

const getActionIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'comment':
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case 'like':
      return <ThumbsUp className="h-4 w-4 text-red-500" />;
    case 'bookmark':
      return <Bookmark className="h-4 w-4 text-purple-500" />;
    case 'read':
      return <Activity className="h-4 w-4 text-green-500" />;
  }
};

export function ActivityFeed() {
  return (
    <Card className="col-span-3 lg:col-span-1">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{activity.user.name}</span>
                    <span className="text-muted-foreground text-xs">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getActionIcon(activity.type)}
                    <span className="ml-1">
                      {activity.action} <span className="font-medium">{activity.target}</span>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
} 