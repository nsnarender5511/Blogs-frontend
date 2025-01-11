import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookMarked, Award, Clock, BookOpen, Plus, Grid2X2, Layout, Search,
  Home, Library, TrendingUp, Users, Bell, Settings, Menu, X, Sun, Moon, 
  User, LogOut, ChevronRight, ArrowRight, Fingerprint
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/ModeToggle";
import { UserNav } from "@/components/UserNav";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Statistics } from "@/components/Statistics";
import { ReadingHistory } from "@/components/ReadingHistory";
import { formatDistanceToNow } from 'date-fns';
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Mock data with more details and images
  const recommendedArticles = [
    {
      id: 1,
      title: "Understanding React Performance",
      author: "Sarah Chen",
      readTime: "8 min",
      difficulty: "Intermediate",
      excerpt: "Deep dive into React rendering optimization and performance best practices",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      tags: ["React", "Performance", "Web Dev"],
      likes: 234,
      saves: 56,
      publishDate: "2024-01-05",
      comments: 45,
      link: "https://react.dev/learn/render-and-commit"
    },
    {
      id: 2,
      title: "The Future of AI in 2025",
      author: "James Wilson",
      readTime: "12 min",
      difficulty: "Advanced",
      excerpt: "Exploring upcoming trends and breakthroughs in artificial intelligence",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
      tags: ["AI", "Technology", "Future"],
      likes: 456,
      saves: 89,
      publishDate: "2024-01-02",
      comments: 78,
      link: "https://openai.com/blog"
    },
    {
      id: 3,
      title: "Basics of System Design",
      author: "Maya Patel",
      readTime: "15 min",
      difficulty: "Beginner",
      excerpt: "Foundation concepts for building scalable software systems",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
      tags: ["Architecture", "Backend", "Design"],
      likes: 345,
      saves: 67,
      publishDate: "2024-01-01",
      comments: 34,
      link: "https://github.com/donnemartin/system-design-primer"
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      author: "Alex Thompson",
      readTime: "10 min",
      difficulty: "Intermediate",
      excerpt: "Essential concepts and techniques in modern machine learning",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60",
      tags: ["ML", "Data Science", "AI"],
      likes: 567,
      saves: 123,
      publishDate: "2023-12-28",
      comments: 89,
      link: "https://www.tensorflow.org/tutorials"
    },
    {
      id: 5,
      title: "Advanced TypeScript Patterns",
      author: "Lisa Kumar",
      readTime: "14 min",
      difficulty: "Advanced",
      excerpt: "Exploring advanced TypeScript features and design patterns for large applications",
      image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&auto=format&fit=crop&q=60",
      tags: ["TypeScript", "JavaScript", "Programming"],
      likes: 678,
      saves: 234,
      publishDate: "2023-12-25",
      comments: 56,
      link: "https://www.typescriptlang.org/docs/handbook/advanced-types.html"
    },
    {
      id: 6,
      title: "Cloud Native Architecture",
      author: "David Martinez",
      readTime: "18 min",
      difficulty: "Advanced",
      excerpt: "Building resilient and scalable applications using cloud-native principles",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
      tags: ["Cloud", "Architecture", "DevOps"],
      likes: 789,
      saves: 167,
      publishDate: "2023-12-22",
      comments: 92,
      link: "https://kubernetes.io/docs/concepts/overview/"
    },
    {
      id: 7,
      title: "CSS Grid Mastery",
      author: "Emma Brown",
      readTime: "9 min",
      difficulty: "Intermediate",
      excerpt: "Master modern CSS layouts with Grid and Flexbox combinations",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60",
      tags: ["CSS", "Web Design", "Frontend"],
      likes: 432,
      saves: 98,
      publishDate: "2023-12-20",
      comments: 67,
      link: "https://css-tricks.com/snippets/css/complete-guide-grid/"
    },
    {
      id: 8,
      title: "GraphQL Best Practices",
      author: "Tom Anderson",
      readTime: "11 min",
      difficulty: "Intermediate",
      excerpt: "Implementing efficient GraphQL APIs with proper caching and security",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=60",
      tags: ["GraphQL", "API", "Backend"],
      likes: 345,
      saves: 87,
      publishDate: "2023-12-18",
      comments: 45,
      link: "https://graphql.org/learn/best-practices/"
    },
    {
      id: 9,
      title: "Web Security Fundamentals",
      author: "Rachel Kim",
      readTime: "16 min",
      difficulty: "Intermediate",
      excerpt: "Essential security concepts every web developer should know",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
      tags: ["Security", "Web Dev", "Best Practices"],
      likes: 890,
      saves: 245,
      publishDate: "2023-12-15",
      comments: 123,
      link: "https://owasp.org/www-project-top-ten/"
    },
    {
      id: 10,
      title: "Docker for Beginners",
      author: "Michael Chang",
      readTime: "13 min",
      difficulty: "Beginner",
      excerpt: "Getting started with containerization using Docker",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop&q=60",
      tags: ["Docker", "DevOps", "Containers"],
      likes: 567,
      saves: 178,
      publishDate: "2023-12-12",
      comments: 88,
      link: "https://docs.docker.com/get-started/"
    },
    {
      id: 11,
      title: "Next.js 14 Features",
      author: "Nina Rodriguez",
      readTime: "10 min",
      difficulty: "Intermediate",
      excerpt: "Exploring the latest features and improvements in Next.js 14",
      image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&auto=format&fit=crop&q=60",
      tags: ["Next.js", "React", "Frontend"],
      likes: 678,
      saves: 198,
      publishDate: "2023-12-10",
      comments: 76,
      link: "https://nextjs.org/docs"
    },
    {
      id: 12,
      title: "Rust for JavaScript Developers",
      author: "Chris Peters",
      readTime: "20 min",
      difficulty: "Advanced",
      excerpt: "Learning Rust programming language from a JavaScript developer's perspective",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60",
      tags: ["Rust", "JavaScript", "Programming"],
      likes: 789,
      saves: 234,
      publishDate: "2023-12-08",
      comments: 145,
      link: "https://rustup.rs"
    },
    {
      id: 13,
      title: "Microservices with Kubernetes",
      author: "Jennifer Wu",
      readTime: "17 min",
      difficulty: "Advanced",
      excerpt: "Building and deploying scalable microservices using Kubernetes",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
      tags: ["Kubernetes", "DevOps", "Microservices"],
      likes: 567,
      saves: 189,
      publishDate: "2023-12-05",
      comments: 92,
      link: "https://kubernetes.io/docs/tutorials/kubernetes-basics/"
    },
    {
      id: 14,
      title: "Web Assembly Deep Dive",
      author: "Marcus Johnson",
      readTime: "15 min",
      difficulty: "Advanced",
      excerpt: "Understanding WebAssembly and its applications in modern web development",
      image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&auto=format&fit=crop&q=60",
      tags: ["WebAssembly", "Performance", "Web Dev"],
      likes: 432,
      saves: 156,
      publishDate: "2023-12-03",
      comments: 67,
      link: "https://webassembly.org/getting-started/developers-guide/"
    },
    {
      id: 15,
      title: "Svelte vs React in 2024",
      author: "Laura Smith",
      readTime: "12 min",
      difficulty: "Intermediate",
      excerpt: "Comparing Svelte and React frameworks for modern web applications",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
      tags: ["Svelte", "React", "Frontend"],
      likes: 678,
      saves: 234,
      publishDate: "2023-12-01",
      comments: 98,
      link: "https://svelte.dev/docs"
    },
    {
      id: 16,
      title: "Database Optimization Guide",
      author: "Carlos Rodriguez",
      readTime: "19 min",
      difficulty: "Advanced",
      excerpt: "Advanced techniques for optimizing database performance at scale",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60",
      tags: ["Database", "Performance", "Backend"],
      likes: 789,
      saves: 267,
      publishDate: "2023-11-28",
      comments: 112,
      link: "https://www.postgresql.org/docs/current/performance-tips.html"
    },
    {
      id: 17,
      title: "Mobile App Testing Strategies",
      author: "Sophie Chen",
      readTime: "11 min",
      difficulty: "Intermediate",
      excerpt: "Best practices for testing mobile applications effectively",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop&q=60",
      tags: ["Testing", "Mobile", "QA"],
      likes: 456,
      saves: 145,
      publishDate: "2023-11-25",
      comments: 78,
      link: "https://developer.android.com/training/testing"
    },
    {
      id: 18,
      title: "Blockchain Development 101",
      author: "Ryan Kim",
      readTime: "16 min",
      difficulty: "Beginner",
      excerpt: "Introduction to blockchain development and smart contracts",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
      tags: ["Blockchain", "Web3", "Crypto"],
      likes: 567,
      saves: 198,
      publishDate: "2023-11-22",
      comments: 89,
      link: "https://ethereum.org/en/developers/docs/"
    },
    {
      id: 19,
      title: "Writing Technical Blog Posts: A Developer's Guide",
      author: "Rizèl Scarlett",
      readTime: "15 min",
      difficulty: "Beginner",
      excerpt: "Learn how to create engaging technical content and share your knowledge effectively",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60",
      tags: ["Writing", "Career", "Development"],
      likes: 423,
      saves: 189,
      publishDate: "2023-11-20",
      comments: 67,
      link: "https://dev.to/blackgirlbytes/the-ultimate-guide-to-writing-technical-blog-posts-5464"
    },
    {
      id: 20,
      title: "The Evolution of Frontend Development in 2024",
      author: "Dan Abramov",
      readTime: "12 min",
      difficulty: "Intermediate",
      excerpt: "Exploring the latest trends and best practices in modern frontend development",
      image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60",
      tags: ["Frontend", "JavaScript", "Web Dev"],
      likes: 892,
      saves: 345,
      publishDate: "2023-11-18",
      comments: 156,
      link: "https://overreacted.io"
    },
    {
      id: 21,
      title: "Building Resilient Microservices",
      author: "Martin Fowler",
      readTime: "20 min",
      difficulty: "Advanced",
      excerpt: "Patterns and practices for designing robust microservice architectures",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      tags: ["Architecture", "Microservices", "Backend"],
      likes: 678,
      saves: 234,
      publishDate: "2023-11-15",
      comments: 89,
      link: "https://martinfowler.com/articles/microservices.html"
    },
    {
      id: 22,
      title: "The Complete Guide to Web Performance",
      author: "Addy Osmani",
      readTime: "25 min",
      difficulty: "Advanced",
      excerpt: "Deep dive into web performance optimization techniques and metrics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      tags: ["Performance", "Web Dev", "Optimization"],
      likes: 756,
      saves: 289,
      publishDate: "2023-11-12",
      comments: 112,
      link: "https://www.smashingmagazine.com/guides/performance/"
    },
    {
      id: 23,
      title: "Understanding Modern CSS",
      author: "Josh Comeau",
      readTime: "14 min",
      difficulty: "Intermediate",
      excerpt: "A deep dive into modern CSS features and techniques",
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&auto=format&fit=crop&q=60",
      tags: ["CSS", "Frontend", "Design"],
      likes: 567,
      saves: 198,
      publishDate: "2023-11-10",
      comments: 78,
      link: "https://www.joshwcomeau.com/css/understanding-layout-algorithms/"
    },
    {
      id: 24,
      title: "The State of JavaScript Testing in 2024",
      author: "Kent C. Dodds",
      readTime: "18 min",
      difficulty: "Intermediate",
      excerpt: "Modern testing practices and tools for JavaScript applications",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
      tags: ["Testing", "JavaScript", "Best Practices"],
      likes: 645,
      saves: 234,
      publishDate: "2023-11-08",
      comments: 92,
      link: "https://kentcdodds.com/blog/common-testing-mistakes"
    },
    {
      id: 25,
      title: "Practical Guide to System Design",
      author: "Alex Xu",
      readTime: "22 min",
      difficulty: "Advanced",
      excerpt: "Real-world system design patterns and case studies",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
      tags: ["System Design", "Architecture", "Backend"],
      likes: 890,
      saves: 456,
      publishDate: "2023-11-05",
      comments: 167,
      link: "https://bytebytego.com"
    },
    {
      id: 26,
      title: "Advanced Git Workflows",
      author: "Scott Chacon",
      readTime: "16 min",
      difficulty: "Advanced",
      excerpt: "Master complex Git operations and team workflows",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60",
      tags: ["Git", "DevOps", "Collaboration"],
      likes: 567,
      saves: 234,
      publishDate: "2023-11-02",
      comments: 88,
      link: "https://git-scm.com/book/en/v2"
    },
    {
      id: 27,
      title: "Building AI-Powered Applications",
      author: "François Chollet",
      readTime: "25 min",
      difficulty: "Advanced",
      excerpt: "Implementing AI features in modern applications",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
      tags: ["AI", "Machine Learning", "Programming"],
      likes: 789,
      saves: 345,
      publishDate: "2023-10-30",
      comments: 123,
      link: "https://keras.io/examples/"
    },
    {
      id: 28,
      title: "Rust Web Development in 2024",
      author: "Steve Klabnik",
      readTime: "20 min",
      difficulty: "Advanced",
      excerpt: "Building web applications with Rust and modern frameworks",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60",
      tags: ["Rust", "Web Dev", "Backend"],
      likes: 678,
      saves: 234,
      publishDate: "2023-10-28",
      comments: 94,
      link: "https://www.rust-lang.org/learn"
    },
    {
      id: 29,
      title: "Mastering TypeScript Generics",
      author: "Matt Pocock",
      readTime: "15 min",
      difficulty: "Advanced",
      excerpt: "Advanced TypeScript patterns and type-level programming",
      image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&auto=format&fit=crop&q=60",
      tags: ["TypeScript", "JavaScript", "Programming"],
      likes: 567,
      saves: 198,
      publishDate: "2023-10-25",
      comments: 76,
      link: "https://www.totaltypescript.com/tutorials"
    },
    {
      id: 30,
      title: "The Future of Web Components",
      author: "Rich Harris",
      readTime: "14 min",
      difficulty: "Intermediate",
      excerpt: "Modern approaches to building reusable web components",
      image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&auto=format&fit=crop&q=60",
      tags: ["Web Components", "Frontend", "JavaScript"],
      likes: 456,
      saves: 167,
      publishDate: "2023-10-22",
      comments: 58,
      link: "https://svelte.dev/blog"
    }
  ];

  // Mock boards data
  const boards = [
    {
      id: 1,
      title: "Web Development",
      description: "Latest articles about web development and best practices",
      articleCount: 12,
      color: "from-blue-500 to-cyan-500",
      icon: Layout
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      description: "Collection of AI and ML resources",
      articleCount: 8,
      color: "from-purple-500 to-pink-500",
      icon: Grid2X2
    },
    {
      id: 3,
      title: "System Design",
      description: "Articles about architecture and system design",
      articleCount: 5,
      color: "from-orange-500 to-red-500",
      icon: Layout
    }
  ];

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      React: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Performance: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Web Dev': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      AI: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      Technology: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      Future: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      Architecture: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      Backend: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      Design: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      ML: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Data Science': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const NavBar = () => (
    <nav className="sticky top-0 z-50 w-full border-b glass-effect backdrop-blur-lg bg-background/80 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center px-4 gap-6">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-primary/10"
          >
            <Layout className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 cursor-pointer relative group"
            whileHover={{ scale: 1.02 }}
          >
            RediGNN
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300"></span>
          </motion.h2>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 px-4 group">
                <Layout className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                Dashboard
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px] grid-cols-2">
                  <li className="row-span-3">
                    <a
                      href="/overview"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Overview
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Get a bird's eye view of your learning progress and achievements.
                      </p>
                    </a>
                  </li>
                  <ListItem href="/feed" title="Feed">
                    Latest articles and updates from your network
                  </ListItem>
                  <ListItem href="/boards" title="Boards">
                    Organize your learning materials
                  </ListItem>
                  <ListItem href="/stats" title="Statistics">
                    Track your learning progress
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-hover:text-primary transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search articles, topics, or tags..."
              className="pl-9 h-10 w-full glass-effect transition-all duration-300 border-muted/50 focus:border-primary/50 hover:border-primary/30 focus:ring-2 focus:ring-primary/20 rounded-full bg-background/50"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-2 bg-background/95 backdrop-blur-lg rounded-lg border shadow-lg z-50"
                >
                  <div className="text-sm text-muted-foreground p-2 flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                    Searching for "{searchQuery}"...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full relative hover:bg-primary/10 transition-all duration-300 group"
          >
            <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
            <span className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </Button>
          <ModeToggle />
          <div className="h-6 w-px bg-border/50"></div>
          <UserNav />
        </div>
      </div>
    </nav>
  );

  // Helper component for navigation menu items
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  // Add this to your existing mock data after recommendedArticles
  const readingHistory = [
    {
      id: 1,
      title: "Introduction to GraphQL",
      progress: 75,
      lastRead: "2024-03-10T15:30:00",
      timeSpent: "45 min",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      progress: 30,
      lastRead: "2024-03-09T10:15:00",
      timeSpent: "20 min",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Docker for Beginners",
      progress: 100,
      lastRead: "2024-03-08T14:20:00",
      timeSpent: "60 min",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const recommendedTopics = [
    { name: "Machine Learning", count: 156, color: "from-purple-500 to-pink-500" },
    { name: "Web Development", count: 284, color: "from-blue-500 to-cyan-500" },
    { name: "DevOps", count: 98, color: "from-orange-500 to-red-500" },
    { name: "Mobile Development", count: 167, color: "from-green-500 to-emerald-500" },
    { name: "Blockchain", count: 73, color: "from-yellow-500 to-orange-500" }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Advanced React Patterns Workshop",
      date: "2024-03-20T14:00:00",
      duration: "2 hours",
      speaker: "Sarah Chen",
      attendees: 156,
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Future of AI Development",
      date: "2024-03-22T10:00:00",
      duration: "1 hour",
      speaker: "James Wilson",
      attendees: 234,
      type: "Webinar",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const readingStats = {
    totalArticles: 47,
    totalTimeSpent: "32h 15m",
    averageDaily: "45m",
    completionRate: 78,
    weeklyStreak: 5,
    topCategories: [
      { name: "Web Development", percentage: 90 },
      { name: "AI & ML", percentage: 30 },
      { name: "DevOps", percentage: 20 },
      { name: "Mobile", percentage: 10 }
    ]
  };

  const UserNav = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-background ring-primary/10 hover:ring-primary/30 transition-all duration-300 group">
          <Avatar className="h-10 w-10 transition-all duration-300 group-hover:scale-105">
            <AvatarImage 
              src="https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff&bold=true" 
              alt="@alex"
              className="transform transition-transform duration-500 group-hover:rotate-[360deg]" 
            />
            <AvatarFallback className="bg-primary/5">
              <User className="h-4 w-4 text-primary/70" />
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage 
              src="https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff&bold=true" 
              alt="@alex"
            />
            <AvatarFallback className="bg-primary/5">
              <User className="h-5 w-5 text-primary/70" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-base">Alex Johnson</p>
            <p className="text-sm text-muted-foreground">alex@example.com</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link to="/profile" className="block">
          <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-primary/5 rounded-md transition-colors duration-200">
            <User className="h-4 w-4 opacity-70" />
            <div className="flex flex-col space-y-1 leading-none">
              <span>Profile</span>
              <span className="text-xs text-muted-foreground">Manage your account</span>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-destructive/5 rounded-md transition-colors duration-200 text-destructive">
          <LogOut className="h-4 w-4" />
          <div className="flex flex-col space-y-1 leading-none">
            <span>Log out</span>
            <span className="text-xs text-muted-foreground">See you next time!</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MainContent = () => (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <Tabs defaultValue="feed" className="space-y-4">
        <div className="flex items-center">
          <TabsList className="p-1 bg-muted/50 backdrop-blur-sm rounded-full border border-muted/20">
            <TabsTrigger 
              value="feed" 
              className="relative data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
            >
              <span>Feed</span>
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary animate-pulse">
                New
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
            >
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
            >
              Following
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 rounded-full"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="feed" className="mt-6 focus-visible:outline-none">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden group hover:shadow-lg transition-all duration-300 animate-pulse">
                  <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer"></div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {[1, 2].map((tag) => (
                          <div key={tag} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        ))}
                      </div>
                      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 
                      bg-background/50 backdrop-blur-sm cursor-pointer transform hover:bg-background/80 
                      border-muted/50 hover:border-primary/20 dark:hover:border-primary/30 hover:ring-2 hover:ring-primary/20 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <motion.span 
                            className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm font-medium flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </motion.span>
                          <motion.span 
                            className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm font-medium transition-all duration-300
                              ${article.difficulty === 'Beginner' ? 'bg-green-500/80 text-white hover:bg-green-600/80' :
                                article.difficulty === 'Intermediate' ? 'bg-yellow-500/80 text-white hover:bg-yellow-600/80' :
                                'bg-red-500/80 text-white hover:bg-red-600/80'}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {article.difficulty}
                          </motion.span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTagColor(tag)} cursor-pointer`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        <h3 className={`font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {article.title}
                        </h3>
                        <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-background ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}`} />
                              <AvatarFallback>{article.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {article.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(article.publishDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-primary/10 hover:text-primary transition-all duration-300 gap-1 rounded-full group/btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <BookMarked className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                              <span className="font-medium group-hover/btn:text-primary">{article.saves}</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="mt-6 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform transition-all duration-300 group-hover:translate-y-[-4px]">
                      <motion.span 
                        className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 backdrop-blur-sm inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        {event.type}
                      </motion.span>
                      <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-white/90">
                        <Clock className="h-4 w-4 text-white/70" />
                        <span className="text-white/90">
                          {new Date(event.date).toLocaleDateString()} • {event.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-background ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.speaker}`} />
                          <AvatarFallback>{event.speaker.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{event.speaker}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees} attendees
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 group/btn"
                      >
                        Register
                        <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform transition-all duration-300 group-hover:translate-y-[-4px]">
                      <motion.span 
                        className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 backdrop-blur-sm inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        {event.type}
                      </motion.span>
                      <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-white/90">
                        <Clock className="h-4 w-4 text-white/70" />
                        <span className="text-white/90">
                          {new Date(event.date).toLocaleDateString()} • {event.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-background ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.speaker}`} />
                          <AvatarFallback>{event.speaker.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{event.speaker}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees} attendees
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 group/btn"
                      >
                        Register
                        <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6 focus-visible:outline-none">
          <div className="grid gap-6">
            {readingHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-muted/50 hover:border-primary/20">
                  <div className="flex items-start gap-4 p-6">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                          <BookOpen className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.timeSpent}</span>
                        </div>
                        <span>•</span>
                        <span>Last read {formatDistanceToNow(new Date(item.lastRead))} ago</span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={item.progress} 
                          className="h-2 transition-all duration-500 overflow-hidden rounded-full bg-muted/30"
                          style={{
                            background: `linear-gradient(90deg, 
                              var(--primary) ${item.progress}%, 
                              var(--muted) ${item.progress}%)`
                          }}
                        />
                        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                          <Fingerprint className="h-4 w-4" />
                          {item.progress}% completed
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 group/btn"
                    >
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <NavBar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          <MainContent />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;