import React, { useState } from 'react';
import { X, Eye, MessageCircle, Heart, Camera, Video, User } from 'lucide-react';
import { UserProfile } from '../types';
import { models } from '../data/models';
import { useNavigate } from 'react-router-dom';

interface UserProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialProfile: UserProfile = {
  username: 'HydenUser_42',
  stats: {
    photosViewed: 247,
    videosViewed: 53,
    messagesSent: 89,
    interactions: 156
  },
  favorites: {
    models: ['1', '5', '8', '12', '15'],
    contentTypes: {
      photos: 180,
      videos: 67
    }
  }
};

export function UserProfileMenu({ isOpen, onClose }: UserProfileMenuProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(profile.username);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim() && !newUsername.match(/^[A-Za-z\s]+$/)) {
      setProfile(prev => ({ ...prev, username: newUsername }));
      setIsEditing(false);
    }
  };

  const followedModels = models.filter(model => 
    profile.favorites.models.includes(model.id)
  );

  const navigateToProfile = (modelId: string) => {
    navigate('/models');
    onClose();
    // Small delay to ensure navigation completes before selecting model
    setTimeout(() => {
      const model = models.find(m => m.id === modelId);
      if (model) {
        const event = new CustomEvent('selectModel', { detail: model });
        window.dispatchEvent(event);
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-[#1F1F1F] shadow-xl z-50 transform transition-transform overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-white/60">Username</label>
          {isEditing ? (
            <form onSubmit={handleUsernameSubmit} className="flex gap-2">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="flex-1 bg-[#2F2F2F] rounded px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-[#E50914]"
                placeholder="Enter username"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#E50914] text-white rounded hover:bg-[#F40612]"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">{profile.username}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-[#E50914] text-sm hover:text-[#F40612]"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-white/80 font-semibold">Activity Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2F2F2F] p-3 rounded-lg">
              <div className="flex items-center gap-2 text-white/60 mb-1">
                <Camera className="w-4 h-4" />
                <span className="text-sm">Photos Viewed</span>
              </div>
              <span className="text-xl font-semibold text-white">{profile.stats.photosViewed}</span>
            </div>
            <div className="bg-[#2F2F2F] p-3 rounded-lg">
              <div className="flex items-center gap-2 text-white/60 mb-1">
                <Video className="w-4 h-4" />
                <span className="text-sm">Videos Viewed</span>
              </div>
              <span className="text-xl font-semibold text-white">{profile.stats.videosViewed}</span>
            </div>
            <div className="bg-[#2F2F2F] p-3 rounded-lg">
              <div className="flex items-center gap-2 text-white/60 mb-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Messages Sent</span>
              </div>
              <span className="text-xl font-semibold text-white">{profile.stats.messagesSent}</span>
            </div>
            <div className="bg-[#2F2F2F] p-3 rounded-lg">
              <div className="flex items-center gap-2 text-white/60 mb-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Interactions</span>
              </div>
              <span className="text-xl font-semibold text-white">{profile.stats.interactions}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white/80 font-semibold flex items-center gap-2">
            Following <Heart className="w-4 h-4 text-[#E50914]" />
          </h3>
          <div className="space-y-2">
            {followedModels.map((model) => (
              <button
                key={model.id}
                onClick={() => navigateToProfile(model.id)}
                className="w-full flex items-center gap-3 p-2 hover:bg-[#2F2F2F] rounded-lg transition-colors group"
              >
                <img
                  src={model.profileImage}
                  alt={model.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <h3 className="text-white font-medium group-hover:text-[#E50914] transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-white/60 text-sm">{model.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}