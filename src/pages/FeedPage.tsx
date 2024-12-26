import React, { useState } from 'react';
import { Post } from '../types';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';
import { PostCard } from '../components/feed/PostCard';
import { Stories } from '../components/feed/Stories';
import { allPosts } from '../data/posts';

export function FeedPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'following' | 'photos' | 'videos' | 'text'>('all');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [followedModels] = useState<string[]>(['1', '2', '3']); // Example followed models

  const filteredPosts = allPosts.filter(post => {
    if (activeTab === 'following') {
      return followedModels.includes(post.modelId);
    }
    if (activeTab === 'photos') {
      return post.image && !post.videoUrl;
    }
    if (activeTab === 'videos') {
      return Boolean(post.videoUrl);
    }
    if (activeTab === 'text') {
      return !post.image && !post.videoUrl;
    }
    return true;
  });

  const toggleSave = (postId: string) => {
    setSavedPosts(current =>
      current.includes(postId)
        ? current.filter(id => id !== postId)
        : [...current, postId]
    );
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar 
        onLogout={() => {}} 
        onModelSelect={() => {}}
        savedItems={allPosts.filter(post => savedPosts.includes(post.id))}
      />
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <Stories />
          
          <div className="bg-[#141414]">
            <div className="flex gap-2 overflow-x-auto stories-scroll">
              <Button
                variant={activeTab === 'all' ? 'primary' : 'secondary'}
                size="xs"
                onClick={() => setActiveTab('all')}
                className="whitespace-nowrap text-xs"
              >
                All
              </Button>
              <Button
                variant={activeTab === 'following' ? 'primary' : 'secondary'}
                size="xs"
                onClick={() => setActiveTab('following')}
                className="flex items-center gap-1 whitespace-nowrap text-xs"
              >
                <span>Following</span>
                <span className="text-xs">❤️</span>
              </Button>
              <Button
                variant={activeTab === 'photos' ? 'primary' : 'secondary'}
                size="xs"
                onClick={() => setActiveTab('photos')}
                className="flex items-center gap-1 whitespace-nowrap text-xs"
              >
                <span>Photos</span>
                <span className="text-xs">📸</span>
              </Button>
              <Button
                variant={activeTab === 'videos' ? 'primary' : 'secondary'}
                size="xs"
                onClick={() => setActiveTab('videos')}
                className="flex items-center gap-1 whitespace-nowrap text-xs"
              >
                <span>Videos</span>
                <span className="text-xs">🎥</span>
              </Button>
              <Button
                variant={activeTab === 'text' ? 'primary' : 'secondary'}
                size="xs"
                onClick={() => setActiveTab('text')}
                className="flex items-center gap-1 whitespace-nowrap text-xs"
              >
                <span>Text</span>
                <span className="text-xs">💭</span>
              </Button>
            </div>
          </div>

          <div className="mt-2 space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSave={() => toggleSave(post.id)}
                isSaved={savedPosts.includes(post.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}