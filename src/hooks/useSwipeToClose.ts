import { useCallback, useRef } from 'react';

interface UseSwipeToCloseProps {
  onClose: () => void;
  threshold?: number;
}

export function useSwipeToClose({ onClose, threshold = 100 }: UseSwipeToCloseProps) {
  const touchStart = useRef<{ y: number; x: number }>({ y: 0, x: 0 });
  const touchEnd = useRef<{ y: number; x: number }>({ y: 0, x: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = {
      y: e.targetTouches[0].clientY,
      x: e.targetTouches[0].clientX
    };
    touchEnd.current = { ...touchStart.current };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      y: e.targetTouches[0].clientY,
      x: e.targetTouches[0].clientX
    };

    if (modalRef.current) {
      const deltaY = touchEnd.current.y - touchStart.current.y;
      const deltaX = Math.abs(touchEnd.current.x - touchStart.current.x);

      // Only transform if swiping more vertical than horizontal
      if (deltaY > 0 && deltaY > deltaX) {
        modalRef.current.style.transform = `translateY(${deltaY}px)`;
        modalRef.current.style.opacity = `${1 - (deltaY / window.innerHeight)}`;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaY = touchEnd.current.y - touchStart.current.y;
    const deltaX = Math.abs(touchEnd.current.x - touchStart.current.x);

    if (modalRef.current) {
      if (deltaY > threshold && deltaY > deltaX) {
        // Swipe down to close
        modalRef.current.style.transform = `translateY(${window.innerHeight}px)`;
        modalRef.current.style.opacity = '0';
        setTimeout(onClose, 300);
      } else {
        // Reset position
        modalRef.current.style.transform = '';
        modalRef.current.style.opacity = '';
      }
    }

    touchStart.current = { y: 0, x: 0 };
    touchEnd.current = { y: 0, x: 0 };
  }, [onClose, threshold]);

  return {
    modalRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}