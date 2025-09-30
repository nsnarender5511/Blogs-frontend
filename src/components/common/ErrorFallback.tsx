"use client"

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ErrorFallbackProps {
  error?: Error | string;
  resetError?: () => void;
  className?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError,
  className = ""
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'An unexpected error occurred';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="p-4 rounded-full bg-destructive/10 mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        {errorMessage}
      </p>
      {resetError && (
        <Button onClick={resetError} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      )}
    </motion.div>
  );
};