import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ReadingItem {
  id: number;
  title: string;
  progress: number;
  lastRead: string;
  timeSpent: string;
  image?: string;
}

interface ReadingProgressProps {
  items: ReadingItem[];
}

export function ReadingProgress({ items }: ReadingProgressProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Continue Reading
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/0 transition-all duration-300" />
              {item.image ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-16 h-16 rounded-md overflow-hidden ring-1 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ) : (
                <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.timeSpent} spent</span>
                </div>
                <div className="relative mt-2">
                  <Progress 
                    value={item.progress} 
                    className="h-1.5 transition-all duration-500"
                    style={{
                      background: `linear-gradient(to right, 
                        var(--primary) ${item.progress}%, 
                        var(--muted) ${item.progress}%)`
                    }}
                  />
                  <span className="absolute right-0 top-0 text-xs text-muted-foreground transform -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.progress}%
                  </span>
                </div>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
} 