import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { models } from '../../data/models';
import { cn } from '../../utils/cn';
import { ReactionButton } from './ReactionButton';
import { useSwipe } from '../../hooks/useSwipe';
import { useSwipeToClose } from '../../hooks/useSwipeToClose';
import { StoryComments } from './StoryComments';

interface StoryModalProps {
  modelId: string | null;
  onClose: () => void;
}

const STORY_DURATION = 5000;
const REACTIONS = {
  LOVE: '😍',
  FIRE: '🔥',
  DEVIL: '😈'
} as const;

export function StoryModal({ modelId, onClose }: StoryModalProps) {
  const navigate = useNavigate();
  const [currentModelIndex, setCurrentModelIndex] = useState(() => {
    return models.findIndex(m => m.id === modelId);
  });
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState<Record<keyof typeof REACTIONS, number>>({
    LOVE: Math.floor(Math.random() * 100),
    FIRE: Math.floor(Math.random() * 100),
    DEVIL: Math.floor(Math.random() * 100)
  });
  const [activeReactions, setActiveReactions] = useState<Set<keyof typeof REACTIONS>>(new Set());

  const model = models[currentModelIndex];
  const stories = model ? [
    { id: '1', image: model.gallery[0], timestamp: new Date(Date.now() - 3600000) },
    { id: '2', image: model.gallery[1], timestamp: new Date() }
  ] : [];

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      if (currentModelIndex < models.length - 1) {
        setCurrentModelIndex(prev => prev + 1);
        setCurrentStoryIndex(0);
        setProgress(0);
      } else {
        onClose();
      }
    }
  }, [currentStoryIndex, stories.length, currentModelIndex, onClose]);

  const goToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else {
      if (currentModelIndex > 0) {
        setCurrentModelIndex(prev => prev - 1);
        setCurrentStoryIndex(1);
        setProgress(0);
      }
    }
  }, [currentStoryIndex, currentModelIndex]);

  const { modalRef, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeToClose({
    onClose,
    threshold: 100
  });

  const { handleTouchStart: handleSwipeStart, handleTouchMove: handleSwipeMove, handleTouchEnd: handleSwipeEnd } = useSwipe({
    onSwipeLeft: goToNextStory,
    onSwipeRight: goToPreviousStory
  });

  const handleTouch = {
    onTouchStart: (e: React.TouchEvent) => {
      handleTouchStart(e);
      handleSwipeStart(e);
      setIsPaused(true);
    },
    onTouchMove: (e: React.TouchEvent) => {
      handleTouchMove(e);
      handleSwipeMove(e);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      handleTouchEnd();
      handleSwipeEnd();
      setIsPaused(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Left third of the screen
    if (x < width * 0.3) {
      goToPreviousStory();
    }
    // Right third of the screen
    else if (x > width * 0.7) {
      goToNextStory();
    }
  };

  useEffect(() => {
    if (!model || isPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToNextStory();
          return 0;
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [model, isPaused, goToNextStory]);

  useEffect(() => {
    if (modelId) {
      setCurrentModelIndex(models.findIndex(m => m.id === modelId));
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  }, [modelId]);

  const navigateToProfile = () => {
    navigate('/models');
    setTimeout(() => {
      const event = new CustomEvent('selectModel', { detail: model });
      window.dispatchEvent(event);
    }, 100);
    onClose();
  };

  if (!model || !stories[currentStoryIndex]) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black md:flex md:items-center md:justify-center touch-none">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <button
          onClick={() => {
            setShowComments(true);
            setIsPaused(true);
          }}
          className="p-2 rounded-full bg-black/50 text-white/80 hover:text-white transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-black/50 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div 
        ref={modalRef}
        className="relative w-full md:max-w-sm h-full md:h-auto md:aspect-[9/16] bg-black overflow-hidden transition-all duration-300"
        {...handleTouch}
        onClick={handleClick}
      >
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
          {stories.map((_, index) => (
            <div
              key={index}
              className="h-0.5 flex-1 bg-white/30 overflow-hidden"
            >
              <div
                className={cn(
                  "h-full bg-white transition-all duration-100",
                  index === currentStoryIndex
                    ? "w-[var(--progress)]"
                    : index < currentStoryIndex
                    ? "w-full"
                    : "w-0"
                )}
                style={{ '--progress': `${progress}%` } as React.CSSProperties}
              />
            </div>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateToProfile();
          }}
          className="absolute top-4 left-2 right-2 flex items-center gap-2 z-10 text-left"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#E50914]">
            <img
              src={model.profileImage}
              alt={model.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium text-sm">{model.name}</p>
            <p className="text-white/60 text-xs">
              {new Date(stories[currentStoryIndex].timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </button>

        <div className="w-full h-full">
          <img
            src={stories[currentStoryIndex].image}
            alt=""
            className="w-full h-full object-cover animate-in slide-in-right"
            draggable="false"
          />
        </div>

        <div className="absolute bottom-6 left-2 right-2 flex items-center justify-center gap-4 z-10">
          {Object.entries(REACTIONS).map(([key, emoji]) => (
            <ReactionButton
              key={key}
              emoji={emoji}
              count={reactions[key as keyof typeof REACTIONS]}
              onClick={() => {
                setReactions(prev => ({
                  ...prev,
                  [key]: prev[key as keyof typeof REACTIONS] + 1
                }));
                setActiveReactions(prev => {
                  const next = new Set(prev);
                  next.add(key as keyof typeof REACTIONS);
                  setTimeout(() => {
                    setActiveReactions(current => {
                      const updated = new Set(current);
                      updated.delete(key as keyof typeof REACTIONS);
                      return updated;
                    });
                  }, 300);
                  return next;
                });
              }}
              isActive={activeReactions.has(key as keyof typeof REACTIONS)}
            />
          ))}
        </div>
      </div>

      <StoryComments
        isOpen={showComments}
        onClose={() => {
          setShowComments(false);
          setIsPaused(false);
        }}
        modelName={model.name}
      />
    </div>
  );
}