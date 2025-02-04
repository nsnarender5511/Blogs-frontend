"use client"

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:bg-primary/10 transition-colors rounded-full group"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 group-hover:text-primary group-hover:-rotate-45 transition-all duration-300" />
      )}
    </Button>
  );
} 