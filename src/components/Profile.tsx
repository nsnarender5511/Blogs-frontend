"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-offset-background ring-primary/20">
            <AvatarImage 
              src="https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff&bold=true" 
              alt="@alex"
            />
            <AvatarFallback className="bg-primary/5">
              <User className="h-8 w-8 text-primary/70" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Alex Johnson</h1>
            <p className="text-muted-foreground">Software Engineer</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>alex@example.com</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label>Bio</Label>
          <textarea 
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
            defaultValue="Passionate about web development and creating user-friendly applications. Always learning and sharing knowledge with the community."
          />
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
        </div>

        {/* Save Button */}
        <Button className="w-full">Save Changes</Button>
      </Card>
    </div>
  );
} 