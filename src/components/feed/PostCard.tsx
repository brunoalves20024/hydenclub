import React, { memo, useState, useRef } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../types';
import { models } from '../../data/models';
import { Comments } from '../Comments';
import { ReactionButton } from './ReactionButton';
import { cn } from '../../utils/cn';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface PostCardProps {
  post: Post;
  onSave: () => void;
  isSaved: boolean;
}

interface LikeParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

export const PostCard = memo(function PostCard({ post, onSave, isSaved }: PostCardProps) {
  const navigate = useNavigate();
  const model = models.find(m => m.id === post.modelId)!;
  const [showReactions, setShowReactions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [likeParticles, setLikeParticles] = useState<LikeParticle[]>([]);
  const lastTapTime = useRef<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [reactions, setReactions] = useState<Record<string, number>>({
    LOVE: Math.floor(Math.random() * 100),
    FIRE: Math.floor(Math.random() * 100),
    DEVIL: Math.floor(Math.random() * 100)
  });

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const createLikeParticles = (x: number, y: number) => {
    const particles: LikeParticle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      opacity: 1
    }));

    setLikeParticles(particles);

    // Animate particles
    const animate = () => {
      setLikeParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - 2,
        x: particle.x + (Math.random() - 0.5) * 4,
        opacity: particle.opacity - 0.02,
        rotation: particle.rotation + 5
      })).filter(p => p.opacity > 0));
    };

    const interval = setInterval(animate, 16);
    setTimeout(() => clearInterval(interval), 1000);
  };

  const handleLike = (e: React.MouseEvent) => {
    if (!isLiked) {
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createLikeParticles(x, y);
      }
    }
    setIsLiked(!isLiked);
  };

  const handleDoubleTap = (e: React.TouchEvent | React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime.current;
    
    if (tapLength < 300 && tapLength > 0) {
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e instanceof TouchEvent 
          ? e.touches[0].clientX - rect.left
          : (e as React.MouseEvent).clientX - rect.left;
        const y = e instanceof TouchEvent
          ? e.touches[0].clientY - rect.top
          : (e as React.MouseEvent).clientY - rect.top;
        
        createLikeParticles(x, y);
      }
      
      setIsLiked(true);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
      e.preventDefault();
    }
    
    lastTapTime.current = currentTime;
  };

  const navigateToProfile = () => {
    navigate('/models');
    setTimeout(() => {
      const event = new CustomEvent('selectModel', { detail: model });
      window.dispatchEvent(event);
    }, 100);
  };

  if (!isIntersecting) {
    return <div ref={targetRef as any} className="h-96" />;
  }

  return (
    <div ref={targetRef as any} className="bg-[#1F1F1F] rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={navigateToProfile}
          className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-full"
        >
          <img
            src={model.profileImage}
            alt={model.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </button>
        <div>
          <button
            onClick={navigateToProfile}
            className="font-semibold text-white hover:text-[#E50914] transition-colors text-left"
          >
            {model.name}
          </button>
          <p className="text-sm text-white/60">{model.location}</p>
        </div>
      </div>

      <p className="text-white/90">{post.content}</p>

      {post.image && (
        <div 
          ref={imageRef}
          className="relative aspect-[4/5] rounded-lg overflow-hidden"
          onTouchStart={handleDoubleTap}
          onClick={handleDoubleTap}
        >
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover"
          />
          {showLikeAnimation && (
            <div className="absolute inset-0 flex items-center justify-center animate-like-pop">
              <Heart className="w-24 h-24 text-white fill-white filter drop-shadow-lg" />
            </div>
          )}
          {likeParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                opacity: particle.opacity,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <button 
            className={cn(
              "flex items-center gap-1 transition-all duration-300",
              isLiked ? "text-[#E50914] scale-110" : "text-white/60 hover:text-[#E50914] hover:scale-110"
            )}
            onClick={handleLike}
          >
            <Heart className={cn(
              "w-6 h-6 transition-transform duration-300",
              isLiked && "fill-current animate-bounce"
            )} />
            <span>{(post.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
          </button>
          <div className="flex items-center gap-2">
            <ReactionButton emoji="😍" count={reactions.LOVE} onClick={() => setReactions(prev => ({ ...prev, LOVE: prev.LOVE + 1 }))} />
            <ReactionButton emoji="🔥" count={reactions.FIRE} onClick={() => setReactions(prev => ({ ...prev, FIRE: prev.FIRE + 1 }))} />
            <ReactionButton emoji="😈" count={reactions.DEVIL} onClick={() => setReactions(prev => ({ ...prev, DEVIL: prev.DEVIL + 1 }))} />
          </div>
        </div>
        <button 
          onClick={onSave}
          className={cn(
            "flex items-center gap-1 transition-all duration-300",
            isSaved ? "text-[#E50914] scale-110" : "text-white/60 hover:text-[#E50914] hover:scale-110"
          )}
        >
          <Bookmark className={cn(
            "w-5 h-5 transition-transform duration-300",
            isSaved && "fill-current animate-bounce"
          )} />
        </button>
      </div>

      <Comments comments={post.comments} />
    </div>
  );
});