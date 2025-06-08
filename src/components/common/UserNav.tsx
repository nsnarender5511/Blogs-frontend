"use client"; // Ensure this is at the top

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, HelpCircle, Layout } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import useUser
import Link from 'next/link'; // Import Link

export function UserNav() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>;
  if (error) return <div>Error: {error.message}</div>;

  // If user is not logged in, UserNav shouldn't be rendered by NavBar.
  // However, as a fallback, or if used elsewhere, it can return null or a login prompt.
  // For this integration, NavBar will handle not rendering UserNav if !user.
  if (!user) {
    return null;
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U');
  const userDisplayName = user.name || user.nickname || 'User';
  const userDisplayEmail = user.email || 'No email provided';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Avatar className="h-8 w-8 ring-2 ring-primary/10 transition-all duration-300 hover:ring-primary/30">
            <AvatarImage src={user.picture || undefined} alt={userDisplayName} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end">
        <DropdownMenuLabel className="p-4 pb-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.picture || undefined} alt={userDisplayName} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{userDisplayName}</p>
                <p className="text-xs text-muted-foreground">{userDisplayEmail}</p>
              </div>
            </div>
            {/* Notification count can be dynamic later if needed */}
            {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bell className="h-3 w-3" />
              <span>3 notifications</span>
            </div> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-2 focus:bg-primary/5 cursor-pointer transition-colors duration-150 rounded-md">
          <Link href="/profile">
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {/* Link to admin dashboard can be conditional based on user role in the future */}
        <DropdownMenuItem asChild className="p-2 focus:bg-primary/5 cursor-pointer transition-colors duration-150 rounded-md">
          <Link href="/admin">
            <Layout className="mr-2 h-4 w-4 text-primary" />
            <span>Admin Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 focus:bg-primary/5 cursor-pointer transition-colors duration-150 rounded-md">
          <Settings className="mr-2 h-4 w-4 text-primary" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 focus:bg-primary/5 cursor-pointer transition-colors duration-150 rounded-md">
          <HelpCircle className="mr-2 h-4 w-4 text-primary" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-2 focus:bg-red-500/5 cursor-pointer transition-colors duration-150 rounded-md text-red-600 focus:text-red-600">
          <a href="/api/auth/logout">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}