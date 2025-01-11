import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 hover:-rotate-45 transition-transform duration-300" />
      )}
    </Button>
  );
} 