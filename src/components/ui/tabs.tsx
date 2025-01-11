import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabListVariants = cva(
  'inline-flex items-center justify-center rounded-lg shadow-sm relative',
  {
    variants: {
      size: {
        default: 'h-12 p-2 gap-4',
        sm: 'h-10 p-1.5 gap-2',
        lg: 'h-14 p-3 gap-6'
      },
      variant: {
        default: 'bg-muted text-muted-foreground',
        outline: 'bg-background border-2 border-muted',
        pill: 'bg-muted/50 backdrop-blur-sm'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabListVariants({ size, variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all',
  {
    variants: {
      size: {
        default: 'px-6 py-2 min-w-[120px]',
        sm: 'px-4 py-1.5 min-w-[100px]',
        lg: 'px-8 py-2.5 min-w-[150px]'
      },
      variant: {
        default: [
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          'hover:bg-background/50 hover:text-foreground/90',
          'data-[state=active]:scale-[1.02] data-[state=active]:font-semibold',
        ],
        outline: [
          'border data-[state=active]:border-primary',
          'data-[state=active]:bg-background data-[state=active]:text-primary',
          'hover:bg-accent hover:text-accent-foreground',
        ],
        pill: [
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
          'hover:bg-muted/80',
          'data-[state=active]:scale-105 data-[state=active]:font-semibold',
        ]
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabTriggerVariants> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, variant, children, icon, badge, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabTriggerVariants({ size, variant }),
      'group relative overflow-hidden',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-primary',
      'after:transition-transform after:duration-300 after:ease-in-out',
      'data-[state=active]:after:scale-x-100',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      {icon && (
        <span className="text-base group-data-[state=active]:text-primary">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge && (
        <span className="ml-2 inline-flex h-5 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary">
          {badge}
        </span>
      )}
    </div>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-left-2',
      'data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-right-2',
      'transition-all duration-300',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
