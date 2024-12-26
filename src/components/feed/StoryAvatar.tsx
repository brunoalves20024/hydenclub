import React from 'react';
import { Model } from '../../types';
import { cn } from '../../utils/cn';

interface StoryAvatarProps {
  model: Model;
  isViewed: boolean;
  onClick: () => void;
}

export function StoryAvatar({ model, isViewed, onClick }: StoryAvatarProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0"
    >
      <div className={cn(
        "w-16 h-16 rounded-full p-[2px]",
        "bg-gradient-to-tr",
        isViewed
          ? "from-gray-400 to-gray-600"
          : "from-[#E50914] to-[#F40612]"
      )}>
        <img
          src={model.profileImage}
          alt={model.name}
          className="w-full h-full rounded-full object-cover border-2 border-[#141414]"
        />
      </div>
      <p className="mt-1 text-xs text-white/80 text-center truncate w-16">
        {model.name.split(' ')[0]}
      </p>
    </button>
  );
}