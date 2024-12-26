import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Model } from '../types';
import { Button } from './ui/Button';
import { Carousel } from './ui/Carousel';
import { useModelStats } from '../hooks/useModelStats';

interface ModelCardProps {
  model: Model;
  onSelect: (model: Model) => void;
  isFollowing: boolean;
  onToggleFollow: (modelId: string) => void;
}

export function ModelCard({ model, onSelect, isFollowing, onToggleFollow }: ModelCardProps) {
  const images = [model.profileImage, ...model.gallery];
  const stats = useModelStats(model.id);

  return (
    <div 
      className="bg-[#1F1F1F] rounded-lg overflow-hidden transition-all hover:scale-[1.02] hover:ring-2 hover:ring-[#E50914]/50 cursor-pointer group"
      onClick={() => onSelect(model)}
    >
      <Carousel images={images} aspectRatio="portrait" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#E50914] transition-colors">{model.name}</h3>
            <p className="text-white/60">{model.location}</p>
          </div>
          <Button
            variant={isFollowing ? "secondary" : "primary"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFollow(model.id);
            }}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
        <p className="text-white/80 line-clamp-2">{model.bio}</p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center text-white/60 hover:text-[#E50914] transition-colors">
            <Heart className="w-5 h-5 mr-1" />
            <span>{stats.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-white/60 hover:text-[#E50914] transition-colors">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{stats.comments.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}