
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right";

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  className?: string;
  distance?: number;
  once?: boolean;
}

export const AnimatedSection = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
  distance = 50,
  once = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Initial animation properties based on direction
  const getAnimationProps = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ 
          opacity: 0,
          ...getAnimationProps()
        }}
        animate={
          isVisible
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, ...getAnimationProps() }
        }
        transition={{
          duration: 0.6,
          delay: delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
