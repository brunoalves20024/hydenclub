import React, { useState } from 'react';
import { Comment } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CommentsProps {
  comments: Comment[];
}

const COMMENTS_PER_PAGE = 10;

// Mix of comments with and without emojis
const commentTemplates = [
  { text: "Absolutely gorgeous!", emoji: null },
  { text: "Stunning as always 🔥", emoji: "🔥" },
  { text: "Perfect", emoji: null },
  { text: "You're amazing", emoji: null },
  { text: "Incredible beauty 😍", emoji: "😍" },
  { text: "Can't take my eyes off you", emoji: null },
  { text: "Wow! 🔥", emoji: "🔥" },
  { text: "Perfection", emoji: null },
  { text: "Beautiful as always", emoji: null },
  { text: "Goddess 👑", emoji: "👑" },
  { text: "Just wow", emoji: null },
  { text: "Incredible 🔥", emoji: "🔥" },
  { text: "Masterpiece", emoji: null },
  { text: "Dream girl 😍", emoji: "😍" },
  { text: "Unreal beauty", emoji: null }
];

// Generate random usernames
const generateUsername = () => {
  const prefixes = ['cool', 'dark', 'alpha', 'king', 'wolf', 'tiger', 'eagle', 'lion', 'storm', 'thunder'];
  const suffixes = ['rider', 'hunter', 'master', 'warrior', 'knight', 'boss', 'chief', 'legend', 'king', 'beast'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${prefix}_${suffix}${number}`;
};

// Generate random comments
const generateComments = (count: number): Comment[] => {
  return Array.from({ length: count }, (_, i) => {
    const template = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
    return {
      id: `comment-${i}`,
      userId: `user-${Math.floor(Math.random() * 1000)}`,
      username: generateUsername(),
      content: template.text,
      emoji: template.emoji,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Random time within last week
      likes: Math.floor(Math.random() * 100)
    };
  });
};

export function Comments({ comments: initialComments }: CommentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [comments] = useState(() => [...initialComments, ...generateComments(50)].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  ));
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const visibleComments = isExpanded 
    ? comments.slice(0, page * COMMENTS_PER_PAGE)
    : [];

  const hasMoreComments = comments.length > page * COMMENTS_PER_PAGE;

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleLike = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Hide Comments
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            View Comments ({comments.length})
          </>
        )}
      </button>

      {isExpanded && (
        <div className="space-y-4">
          {visibleComments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#2F2F2F] flex items-center justify-center text-white/60">
                {comment.emoji || '👤'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{comment.username}</span>
                  <span className="text-sm text-white/40">{formatTimestamp(comment.timestamp)}</span>
                </div>
                <p className="text-white/80 mt-1">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`text-sm flex items-center gap-1 transition-colors ${
                      likedComments.has(comment.id) ? 'text-[#E50914]' : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {likedComments.has(comment.id) ? '❤️' : '🤍'} {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                  </button>
                  <button className="text-sm text-white/40 hover:text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}

          {hasMoreComments && (
            <button
              onClick={loadMore}
              className="text-[#E50914] hover:text-[#F40612] transition-colors text-sm"
            >
              Load more comments
            </button>
          )}
        </div>
      )}
    </div>
  );
}