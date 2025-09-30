"use client"

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  hoverScale?: number;
  tapScale?: number;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  hoverScale = 1.05,
  tapScale = 0.95,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button className={cn('transition-all', className)} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export const FloatingActionButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button
        size="icon"
        className={cn(
          'h-14 w-14 rounded-full shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};