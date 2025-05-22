import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Users, Package } from 'lucide-react';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  title: string;
  icon: React.ReactNode;
}

const Counter = ({ end, duration, suffix = "", title, icon }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Create an Intersection Observer to detect when the counter is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Trigger animation whenever the element enters the viewport, regardless of scroll direction
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounter();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  const animateCounter = () => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateCounter = () => {
      const now = Date.now();
      const remaining = Math.max(endTime - now, 0);
      const progress = 1 - remaining / duration;
      
      // Using easeOutQuad easing function for smoother animation
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * end));
      
      if (now < endTime) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <div className="text-teal mb-4">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold text-foreground dark:text-white">
        {count}{suffix && <span> {suffix}</span>}
      </div>
      <div className="text-foreground dark:text-lightSlate mt-2 text-center font-medium">{title}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-background dark:bg-navy/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <Counter 
            end={100} 
            suffix="+" 
            duration={2000} 
            title="Happy Clients" 
            icon={<Users className="w-10 h-10" />} 
          />
          <Counter 
            end={1000} 
            suffix="+" 
            duration={2000} 
            title="Cups of Coffee Consumed" 
            icon={<Coffee className="w-10 h-10" />} 
          />
          <Counter 
            end={100} 
            suffix="+" 
            duration={2000} 
            title="Successful Digital Products" 
            icon={<Package className="w-10 h-10" />} 
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
