"use client"

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: 'square' | '16/9' | '4/3' | 'auto';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '',
  aspectRatio = 'auto',
  priority = false,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      if (fallbackSrc) {
        setImageSrc(fallbackSrc);
      }
      onError?.();
    };
  }, [src, fallbackSrc, isInView, onLoad, onError]);

  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    'auto': ''
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-muted',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted-foreground/10 to-muted" />
      )}
      
      {hasError && !fallbackSrc ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImageOff className="h-8 w-8 mx-auto mb-2" />
            <p className="text-xs">Failed to load image</p>
          </div>
        </div>
      ) : (
        isInView && (
          <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            loading={priority ? 'eager' : 'lazy'}
          />
        )
      )}
    </div>
  );
};