import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-muted-foreground">
      <a href="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4" />
      </a>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <a
            href={item.href}
            className={cn(
              "ml-1 hover:text-foreground",
              index === items.length - 1 && "text-foreground font-medium"
            )}
          >
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  );
} 