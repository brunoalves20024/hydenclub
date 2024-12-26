import { useState, useEffect } from 'react';

interface ModelStats {
  likes: number;
  comments: number;
  lastUpdate: number;
}

const INITIAL_STATS: Record<string, ModelStats> = {};
const UPDATE_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const LOCAL_STORAGE_KEY = 'modelStats';

export function useModelStats(modelId: string) {
  const [stats, setStats] = useState<ModelStats>(() => {
    const savedStats = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      return parsed[modelId] || generateInitialStats(modelId);
    }
    return generateInitialStats(modelId);
  });

  useEffect(() => {
    const checkAndUpdateStats = () => {
      const now = Date.now();
      if (now - stats.lastUpdate >= UPDATE_INTERVAL) {
        setStats(prev => {
          const incrementLikes = Math.floor(Math.random() * 50) + 10;
          const incrementComments = Math.floor(Math.random() * 10) + 2;
          
          const newStats = {
            likes: prev.likes + incrementLikes,
            comments: prev.comments + incrementComments,
            lastUpdate: now
          };

          // Save to localStorage
          const savedStats = localStorage.getItem(LOCAL_STORAGE_KEY);
          const allStats = savedStats ? JSON.parse(savedStats) : {};
          allStats[modelId] = newStats;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allStats));

          return newStats;
        });
      }
    };

    const interval = setInterval(checkAndUpdateStats, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [modelId, stats.lastUpdate]);

  return stats;
}

function generateInitialStats(modelId: string): ModelStats {
  // Generate base numbers that increase with model ID to create a natural progression
  const idNumber = parseInt(modelId);
  const baseLikes = 1000 + (idNumber * 500) + Math.floor(Math.random() * 1000);
  const baseComments = 100 + (idNumber * 50) + Math.floor(Math.random() * 100);

  return {
    likes: baseLikes,
    comments: baseComments,
    lastUpdate: Date.now()
  };
}