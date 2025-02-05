import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, HelpCircle, Bell, Layout } from "lucide-react";
import { motion } from "framer-motion";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Avatar className="h-8 w-8 ring-2 ring-primary/10 transition-all duration-300 hover:ring-primary/30">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
            <AvatarFallback>AX</AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end">
        <DropdownMenuLabel className="p-4 pb-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                <AvatarFallback>AX</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">alex@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bell className="h-3 w-3" />
                <span>3 notifications</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 focus:bg-primary/5 cursor-pointer transition-colors duration-150 rounded-md">
          <User className="mr-2 h-4 w-4 text-primary" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="p-2 focus:bg-primary/5 cursor-pointer transition-colors duration-150 rounded-md">
          <a href="/admin">
            <Layout className="mr-2 h-4 w-4 text-primary" />
            <span>Admin Dashboard</span>
          </a>
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
        <DropdownMenuItem className="p-2 focus:bg-red-500/5 cursor-pointer transition-colors duration-150 rounded-md text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 