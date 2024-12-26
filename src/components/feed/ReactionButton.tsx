import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface ReactionButtonProps {
  emoji: string;
  count: number;
  onClick: () => void;
  isActive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  rotation: number;
}

export function ReactionButton({ emoji, count, onClick, isActive }: ReactionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationFrameRef = useRef<number>();

  const createParticles = () => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newParticles: Particle[] = Array.from({ length: 12 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      return {
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 1,
        rotation: Math.random() * 360
      };
    });

    setParticles(newParticles);
  };

  const updateParticles = () => {
    setParticles(prevParticles => 
      prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1, // gravity
          scale: particle.scale * 0.95,
          opacity: particle.opacity * 0.95,
          rotation: particle.rotation + 5
        }))
        .filter(particle => particle.opacity > 0.1)
    );
  };

  useEffect(() => {
    if (particles.length > 0) {
      const animate = () => {
        updateParticles();
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length]);

  const handleClick = () => {
    onClick();
    createParticles();
    
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(1.4)';
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1)';
        }
      }, 200);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative transition-all duration-300",
          isActive && "animate-reaction-pop",
          isHovered && "scale-125"
        )}
        style={{ transition: 'transform 0.2s ease-out' }}
      >
        <span className={cn(
          "text-3xl inline-block transition-all duration-300 relative",
          isHovered ? "animate-bounce" : "animate-float"
        )}>
          {emoji}
        </span>
        {count > 0 && (
          <span className={cn(
            "absolute -top-2 -right-2 text-xs bg-[#E50914] text-white",
            "rounded-full px-1.5 min-w-[20px] h-5 flex items-center justify-center",
            "transition-all duration-300 transform",
            isActive && "animate-bounce",
            "animate-in fade-in zoom-in"
          )}>
            {count}
          </span>
        )}

        {/* Particle Effects */}
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
              opacity: particle.opacity,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {emoji}
          </div>
        ))}

        {/* Ripple Effect */}
        <div className={cn(
          "absolute inset-0 rounded-full",
          "before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:scale-0 before:opacity-0",
          "after:absolute after:inset-0 after:rounded-full after:bg-white/10 after:scale-0 after:opacity-0",
          "group-hover:before:animate-ripple group-hover:after:animate-ripple-delayed"
        )} />
      </button>
    </div>
  );
}