import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CarouselProps {
  images: string[];
  aspectRatio?: 'square' | 'portrait' | 'video';
  className?: string;
  onClick?: () => void;
}

export function Carousel({ images, aspectRatio = 'portrait', className, onClick }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const previous = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      previous();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-advance carousel every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 10000); // Changed from 5000 to 10000 ms

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={cn('relative group', className)}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={cn(
        'relative overflow-hidden',
        {
          'aspect-square': aspectRatio === 'square',
          'aspect-[3/4]': aspectRatio === 'portrait',
          'aspect-video': aspectRatio === 'video',
        }
      )}>
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              'absolute inset-0 transition-transform duration-300 ease-in-out will-change-transform',
              {
                'translate-x-0': index === currentIndex,
                'translate-x-full': index > currentIndex,
                '-translate-x-full': index < currentIndex,
              }
            )}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
      </div>

      <button
        onClick={previous}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity sm:block hidden"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity sm:block hidden"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-all',
              index === currentIndex ? 'bg-white w-3' : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  );
}