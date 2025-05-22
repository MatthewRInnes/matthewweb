
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}

export const CountUp = ({ 
  end, 
  duration = 2000, 
  delay = 0,
  suffix = ""
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    // Add delay before starting the animation
    const delayTimeout = setTimeout(() => {
      let startTime: number;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function to start slow and end slow
        const easeInOutCubic = percentage < 0.5
          ? 4 * percentage * percentage * percentage
          : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
          
        const currentCount = Math.floor(easeInOutCubic * end);
        setCount(currentCount);
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setHasAnimated(true);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(delayTimeout);
      };
    }, delay);
    
    return () => clearTimeout(delayTimeout);
  }, [isInView, end, duration, delay, hasAnimated]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};
