import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '../../utils/cn';

// ... (keep the interfaces)

export function StoryComments({ isOpen, onClose, modelName }: StoryCommentsProps) {
  const [comments, setComments] = useState<StoryComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: StoryComment = {
      id: Date.now().toString(),
      username: 'User_' + Math.floor(Math.random() * 1000),
      content: newComment.trim(),
      timestamp: new Date(),
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-black/50 z-[60] md:z-50",
        "flex justify-end transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className={cn(
          "w-full md:w-80 bg-[#1F1F1F] h-[70vh] md:h-full transition-transform duration-300",
          "fixed bottom-0 md:relative rounded-t-xl md:rounded-none",
          isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments
              </h2>
              <button 
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/60 mt-1">
              Commenting on {modelName}'s story
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className={cn(
                  "bg-[#2F2F2F] rounded-lg p-3",
                  isAnimating && "animate-in fade-in slide-in-from-right"
                )}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-white">{comment.username}</span>
                  <span className="text-xs text-white/40">
                    {comment.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-white/80 mt-1">{comment.content}</p>
              </div>
            ))}
          </div>

          <form 
            onSubmit={handleSubmit}
            className="p-4 border-t border-white/10 bg-[#1F1F1F]"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#2F2F2F] rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 text-white bg-[#E50914] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F40612] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}