import React from 'react';
import { X, Image, Video, MessageSquare, ExternalLink } from 'lucide-react';
import { Post } from '../types';
import { models } from '../data/models';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

interface SavedItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: Post[];
}

export function SavedItemsDrawer({ isOpen, onClose, savedItems }: SavedItemsDrawerProps) {
  const navigate = useNavigate();

  const groupedItems = {
    photos: savedItems.filter(item => item.image && !item.videoUrl),
    videos: savedItems.filter(item => item.videoUrl),
    posts: savedItems.filter(item => !item.image && !item.videoUrl)
  };

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
    <div className="fixed inset-y-0 right-0 w-80 bg-[#1F1F1F] shadow-xl z-50 transform transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Saved Items</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <section>
              <h3 className="flex items-center gap-2 text-white/80 mb-3">
                <Image className="w-4 h-4" />
                Photos ({groupedItems.photos.length})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {groupedItems.photos.map(item => {
                  const model = models.find(m => m.id === item.modelId);
                  return (
                    <div 
                      key={item.id} 
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => model && navigateToProfile(model.id)}
                    >
                      <img 
                        src={item.image} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-medium truncate">
                            {model?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-white/80 mb-3">
                <Video className="w-4 h-4" />
                Videos ({groupedItems.videos.length})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {groupedItems.videos.map(item => {
                  const model = models.find(m => m.id === item.modelId);
                  return (
                    <div 
                      key={item.id} 
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => model && navigateToProfile(model.id)}
                    >
                      <img 
                        src={item.image} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-medium truncate">
                            {model?.name}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-white/80 mb-3">
                <MessageSquare className="w-4 h-4" />
                Text Posts ({groupedItems.posts.length})
              </h3>
              <div className="space-y-2">
                {groupedItems.posts.map(item => {
                  const model = models.find(m => m.id === item.modelId);
                  return (
                    <div 
                      key={item.id} 
                      className="group p-3 bg-[#2F2F2F] rounded-lg cursor-pointer hover:bg-[#3F3F3F] transition-colors"
                      onClick={() => model && navigateToProfile(model.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{model?.name}</span>
                        <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                      </div>
                      <p className="text-white/80 text-sm line-clamp-2">{item.content}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}