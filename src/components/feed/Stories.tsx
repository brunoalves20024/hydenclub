import React, { useState, useRef } from 'react';
import { models } from '../../data/models';
import { StoryModal } from './StoryModal';
import { StoryAvatar } from './StoryAvatar';
import { useStoryDrag } from '../../hooks/useStoryDrag';

export function Stories() {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDragging, handleMouseDown, handleMouseUp, handleMouseMove } = useStoryDrag(scrollRef);

  const handleStoryClick = (modelId: string) => {
    if (!isDragging) {
      setSelectedModelId(modelId);
      setViewedStories(prev => new Set([...prev, modelId]));
    }
  };

  return (
    <>
      <div 
        ref={scrollRef}
        className="stories-scroll overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-4 touch-pan-x">
          {models.map((model) => (
            <StoryAvatar
              key={model.id}
              model={model}
              isViewed={viewedStories.has(model.id)}
              onClick={() => handleStoryClick(model.id)}
            />
          ))}
        </div>
      </div>

      {selectedModelId && (
        <StoryModal
          modelId={selectedModelId}
          onClose={() => setSelectedModelId(null)}
        />
      )}
    </>
  );
}