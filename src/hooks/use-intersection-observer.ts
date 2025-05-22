import { useEffect, useRef, useState } from 'react';

// Define valid animation directions for the intersection observer
// These determine how elements animate when they come into view
export type Direction = 'up' | 'down' | 'left' | 'right' | 'top' | 'bottom';

// Configuration interface for the intersection observer hook
// Controls how and when elements become visible in the viewport
export interface UseIntersectionObserverProps {
  direction: Direction;
  threshold?: number;
  rootMargin?: string;
}

// Return type for the intersection observer hook
// Provides the ref to attach to elements and the animation class name
export interface IntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement>;
  className: string;
}

// Custom hook for implementing intersection observer functionality
// Triggers animations when elements enter the viewport
export const useIntersectionObserver = ({
  direction,
  threshold = 0.1,
  rootMargin = '0px',
}: UseIntersectionObserverProps): IntersectionObserverReturn => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Create an intersection observer to detect when elements enter the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once the element is visible to improve performance
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function to remove the observer when component unmounts
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]);

  // Return the ref and class name for animation
  return {
    ref: elementRef,
    className: `animate-${direction} ${isVisible ? 'animate-visible' : 'animate-hidden'}`,
  };
}; 