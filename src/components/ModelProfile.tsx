import React, { useState } from 'react';
import { MapPin, Calendar, Users, Image, MessageCircle } from 'lucide-react';
import { Model } from '../types';
import { Button } from './ui/Button';
import { GroupModal } from './GroupModal';
import { StoryModal } from './feed/StoryModal';

interface ModelProfileProps {
  model: Model;
  isFollowing: boolean;
  onToggleFollow: (modelId: string) => void;
}

export function ModelProfile({ model, isFollowing, onToggleFollow }: ModelProfileProps) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  
  // Simulated stats - in a real app these would come from the backend
  const stats = {
    followers: Math.floor(Math.random() * 50000) + 10000,
    posts: Math.floor(Math.random() * 500) + 100,
    age: Math.floor(Math.random() * 10) + 18 // Random age between 18-28
  };

  return (
    <>
      <div className="bg-[#1F1F1F] rounded-xl shadow-lg p-4 md:p-6 text-white">
        {/* Profile Header - Mobile */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowStoryModal(true)}
            className="relative mx-auto block group"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#E50914]/50 transition-transform duration-300 group-hover:scale-105">
              <img
                src={model.profileImage}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">View Story</span>
            </div>
          </button>
          <h1 className="text-xl font-bold text-white text-center mt-4">{model.name}</h1>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <div className="flex items-center text-white/60">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{model.location}</span>
            </div>
            <div className="flex items-center text-white/60">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{stats.age} years</span>
            </div>
          </div>
        </div>

        {/* Profile Header - Desktop */}
        <div className="hidden md:flex items-start gap-6">
          <button
            onClick={() => setShowStoryModal(true)}
            className="relative group"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-[#E50914]/50 transition-transform duration-300 group-hover:scale-105">
              <img
                src={model.profileImage}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">View Story</span>
            </div>
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-white">{model.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-white/60">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{model.location}</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{stats.age} years</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex gap-3">
                <Button
                  variant={isFollowing ? "secondary" : "primary"}
                  onClick={() => onToggleFollow(model.id)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <button 
                  onClick={() => setShowChatModal(true)}
                  className="px-6 py-2 bg-[#4CD964] text-white rounded-full hover:bg-[#3CBD53] transition-colors flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with Me
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/60" />
                <span className="text-white/90">{stats.followers.toLocaleString()} followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-white/60" />
                <span className="text-white/90">{stats.posts} posts</span>
              </div>
            </div>

            <p className="mt-4 text-white/80">{model.bio}</p>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden flex gap-3 mt-6">
          <Button
            variant={isFollowing ? "secondary" : "primary"}
            onClick={() => onToggleFollow(model.id)}
            className="flex-1"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <button 
            onClick={() => setShowChatModal(true)}
            className="flex-1 px-4 py-2 bg-[#4CD964] text-white rounded-full hover:bg-[#3CBD53] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Me
          </button>
        </div>

        {/* Mobile Bio */}
        <div className="md:hidden mt-6">
          <p className="text-white/80">{model.bio}</p>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/60" />
              <span className="text-white/90">{stats.followers.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-white/60" />
              <span className="text-white/90">{stats.posts} posts</span>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {model.gallery.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <GroupModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        model={model}
      />

      {showStoryModal && (
        <StoryModal
          modelId={model.id}
          onClose={() => setShowStoryModal(false)}
        />
      )}
    </>
  );
}