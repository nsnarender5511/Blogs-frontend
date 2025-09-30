"use client"

import React, { useState, FormEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, MapPin, Github, Twitter, Linkedin, Camera, Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  github: string;
  twitter: string;
  linkedin: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  bio?: string;
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Alex Johnson',
    title: 'Software Engineer',
    email: 'alex@example.com',
    location: 'San Francisco, CA',
    bio: 'Passionate about web development and creating user-friendly applications. Always learning and sharing knowledge with the community.',
    github: 'alexjohnson',
    twitter: 'alexjohnson',
    linkedin: 'alexjohnson'
  });

  const [tempData, setTempData] = useState<ProfileData>(profileData);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!tempData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (tempData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!tempData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (tempData.bio && tempData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(profileData);
    setErrors({});
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfileData(tempData);
    setIsEditing(false);
    setIsSaving(false);
    toast.success('Profile updated successfully!');
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const displayData = isEditing ? tempData : profileData;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6 space-y-8">
        <form onSubmit={handleSave}>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-offset-background ring-primary/20">
                  <AvatarImage 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayData.name)}&background=6366f1&color=fff&bold=true`}
                    alt={displayData.name}
                  />
                  <AvatarFallback className="bg-primary/5">
                    <User className="h-8 w-8 text-primary/70" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Change avatar"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {isEditing ? (
                  <>
                    <div>
                      <Input
                        value={tempData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-destructive' : ''}
                        placeholder="Your name"
                        aria-label="Name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <Input
                      value={tempData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Your title"
                      aria-label="Title"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                    <p className="text-muted-foreground">{profileData.title}</p>
                  </>
                )}
              </div>
            </div>
            
            {!isEditing ? (
              <Button type="button" onClick={handleEdit} variant="outline">
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button type="button" onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              {isEditing ? (
                <div>
                  <Input
                    id="email"
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">{profileData.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={tempData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              ) : (
                <p className="text-muted-foreground">{profileData.location}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">
              Bio
              {isEditing && (
                <span className="text-xs text-muted-foreground ml-2">
                  ({tempData.bio.length}/500)
                </span>
              )}
            </Label>
            {isEditing ? (
              <div>
                <Textarea
                  id="bio"
                  value={tempData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className={cn(
                    "min-h-[100px] resize-none",
                    errors.bio ? 'border-destructive' : ''
                  )}
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                  aria-invalid={!!errors.bio}
                  aria-describedby={errors.bio ? 'bio-error' : undefined}
                />
                {errors.bio && (
                  <p id="bio-error" className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.bio}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {profileData.bio}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <Label>Social Links</Label>
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={tempData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="GitHub username"
                    aria-label="GitHub username"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={tempData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="Twitter username"
                    aria-label="Twitter username"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={tempData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="LinkedIn username"
                    aria-label="LinkedIn username"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {profileData.github && (
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open(`https://github.com/${profileData.github}`, '_blank')}
                  >
                    <Github className="h-4 w-4" />
                    <span>{profileData.github}</span>
                  </Button>
                )}
                {profileData.twitter && (
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open(`https://twitter.com/${profileData.twitter}`, '_blank')}
                  >
                    <Twitter className="h-4 w-4" />
                    <span>{profileData.twitter}</span>
                  </Button>
                )}
                {profileData.linkedin && (
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open(`https://linkedin.com/in/${profileData.linkedin}`, '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>{profileData.linkedin}</span>
                  </Button>
                )}
              </div>
            )}
          </div>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-muted/50 rounded-lg p-4 mt-4"
              >
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  All changes will be saved when you click Save
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}