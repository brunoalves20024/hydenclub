import { useState, useEffect, useCallback } from 'react';

interface UseStoryProgressProps {
  isActive: boolean;
  onComplete: () => void;
  duration?: number;
}

export function useStoryProgress({ 
  isActive, 
  onComplete, 
  duration = 3000 
}: UseStoryProgressProps) {
  const [progress, setProgress] = useState(0);

  const reset = useCallback(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = 30; // Update every 30ms
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onComplete();
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, duration, onComplete]);

  return { progress, reset };
}