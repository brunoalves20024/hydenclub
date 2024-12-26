import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../types';

interface FeedProps {
  posts: Post[];
}

export function Feed({ posts }: FeedProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start gap-4">
            <img
              src={post.image}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">Model Name</h3>
                <span className="text-gray-500 text-sm">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt=""
                  className="mt-4 rounded-lg w-full object-cover max-h-96"
                />
              )}
              <div className="mt-4 flex items-center gap-6">
                <button className="flex items-center text-gray-600 hover:text-pink-500">
                  <Heart className="w-5 h-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-green-500">
                  <Share2 className="w-5 h-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}