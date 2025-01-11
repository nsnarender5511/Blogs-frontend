import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  User, Mail, BookOpen, Clock, Award, TrendingUp,
  Edit2, Github, Twitter, Linkedin, Globe, Lock, Plus
} from 'lucide-react';
import { motion } from "framer-motion";

const Profile = () => {
  const userStats = {
    articlesRead: 47,
    totalTimeSpent: "32h 15m",
    averageDaily: "45m",
    learningStreak: 5,
    topicsFollowed: 12,
    completionRate: 78
  };

  const recentAchievements = [
    {
      title: "30 Day Streak",
      date: "March 15, 2024",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "100 Articles Read",
      date: "March 10, 2024",
      icon: BookOpen,
      color: "text-blue-500"
    },
    {
      title: "Speed Reader",
      date: "March 5, 2024",
      icon: Clock,
      color: "text-purple-500"
    }
  ];

  const learningProgress = [
    { topic: "Web Development", progress: 85 },
    { topic: "Machine Learning", progress: 60 },
    { topic: "DevOps", progress: 45 },
    { topic: "Mobile Development", progress: 30 }
  ];

  const recommendedTopics = [
    { name: "Machine Learning", count: 156, color: "from-purple-500 to-pink-500" },
    { name: "Web Development", count: 284, color: "from-blue-500 to-cyan-500" },
    { name: "DevOps", count: 98, color: "from-orange-500 to-red-500" },
    { name: "Mobile Development", count: 167, color: "from-green-500 to-emerald-500" },
    { name: "Blockchain", count: 73, color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="h-48 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
            <div className="absolute right-4 top-4">
              <Button variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Cover
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <Avatar className="h-32 w-32 ring-4 ring-background">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div className="mb-4">
              <h1 className="text-2xl font-bold">Alex Johnson</h1>
              <p className="text-muted-foreground">Senior Software Engineer</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-20">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Information */}
                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                          <Input defaultValue="Alex Johnson" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <Input defaultValue="alex@example.com" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Location</label>
                          <Input defaultValue="San Francisco, CA" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Role</label>
                          <Input defaultValue="Senior Software Engineer" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Bio</label>
                        <textarea
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                          defaultValue="Passionate about web development and machine learning. Always learning and sharing knowledge with the community."
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          GitHub
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Articles Read</span>
                        <span className="font-semibold">{userStats.articlesRead}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Time Spent</span>
                        <span className="font-semibold">{userStats.totalTimeSpent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Daily Average</span>
                        <span className="font-semibold">{userStats.averageDaily}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Learning Streak</span>
                        <span className="font-semibold">{userStats.learningStreak} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Topics Followed</span>
                        <span className="font-semibold">{userStats.topicsFollowed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-semibold">{userStats.completionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recentAchievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 rounded-lg border bg-card text-card-foreground"
                        >
                          <achievement.icon className={`h-8 w-8 ${achievement.color} mb-2`} />
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Progress */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                    <div className="space-y-4">
                      {learningProgress.map((item) => (
                        <div key={item.topic} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.topic}</span>
                            <span className="text-muted-foreground">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              {/* Activity content */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  {/* Add activity content here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Topics of Interest</h2>
                    <div className="space-y-4">
                      {recommendedTopics.map((topic) => (
                        <div key={topic.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`topic-${topic.name}`}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                            <label htmlFor={`topic-${topic.name}`} className="text-sm font-medium">
                              {topic.name}
                            </label>
                          </div>
                          <span className="text-xs text-muted-foreground">{topic.count} articles</span>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Topics
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Reading Preferences</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Preferred Reading Time</label>
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="5">Under 5 minutes</option>
                          <option value="10">5-10 minutes</option>
                          <option value="15">10-15 minutes</option>
                          <option value="20">Over 15 minutes</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                        <div className="space-y-2">
                          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                            <div key={level} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`level-${level}`}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                defaultChecked={level === 'Intermediate'}
                              />
                              <label htmlFor={`level-${level}`} className="text-sm">{level}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Content Format</label>
                        <div className="space-y-2">
                          {['Articles', 'Tutorials', 'Case Studies', 'Video Content'].map((format) => (
                            <div key={format} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`format-${format}`}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                defaultChecked={['Articles', 'Tutorials'].includes(format)}
                              />
                              <label htmlFor={`format-${format}`} className="text-sm">{format}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Daily Digest</p>
                          <p className="text-sm text-muted-foreground">Get a daily email with personalized article recommendations</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Content Alerts</p>
                          <p className="text-sm text-muted-foreground">Get notified when new articles in your topics are published</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Summary</p>
                          <p className="text-sm text-muted-foreground">Receive a weekly summary of your reading activity</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <Button className="w-full mt-6">Save Preferences</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              {/* Security content */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                  {/* Add security content here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile; 