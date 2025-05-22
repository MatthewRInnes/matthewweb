import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const roles = [
    'Web Developer',
    'Digital Designer',
    'UX/UI Designer',
    'Front-End Developer',
    'Creative Technologist'
  ];

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        // Typing animation
        if (charIndex < roles[roleIndex].length) {
          setDisplayText(prev => prev + roles[roleIndex].charAt(charIndex));
          setCharIndex(charIndex + 1);
        } else {
          // Pause at the end of typing before starting to delete
          setIsTyping(false);
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(false);
          }, 1500);
        }
      } else {
        // Deleting animation
        if (charIndex > 0) {
          setDisplayText(roles[roleIndex].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next role and start typing again
          setIsTyping(true);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isTyping ? 100 : 50);

    return () => clearInterval(typingInterval);
  }, [charIndex, isTyping, roleIndex, roles]);

  return (
    <section id="top" className="min-h-screen flex items-center pt-32 pb-16"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Text content - takes 7 columns on md screens */}
          <div className="md:col-span-7">
            <p className="text-gradient-teal mb-4 animate-fade-in-up font-medium">Hello! I'm</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Matthew Innes
            </h1>
            
            {/* Fixed solution for typing animation with stable height to prevent jumping */}
            <div className="mb-20 animate-fade-in-up h-24 md:h-28" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-lightestSlate leading-relaxed">
                I'm a <span className="text-gradient-teal inline-block" style={{ lineHeight: 1.5, paddingBottom: '10px' }}>{displayText}</span>
                <span className="border-r-2 border-gradient-teal ml-1 inline-block align-text-bottom animate-pulse" style={{ height: '1em' }}></span>
              </h2>
            </div>
            
            <div className="mt-4">
              <p className="text-foreground dark:text-lightSlate max-w-xl mb-8 lg:mb-12 text-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                I'm a passionate software developer with a love for creating digital experiences that are both beautiful and functional. My journey in web development began back in 2015 when I decided to try creating a custom website.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                variant="outline" 
                className="border-gradient-teal text-gradient-teal hover:bg-gradient-teal/10 px-5 py-5 sm:px-6 sm:py-6 text-base sm:text-lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button 
                variant="default" 
                className="bg-gradient-teal hover:bg-gradient-teal/90 text-navy px-5 py-5 sm:px-6 sm:py-6 text-base sm:text-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </Button>
            </div>
          </div>
          
          {/* Profile Image - takes 5 columns on md screens */}
          <div className="md:col-span-5 flex justify-center items-center">
            {/*
              Profile photo container:
              - 'relative' for positioning child elements if needed
              - 'w-64 h-64 sm:w-80 sm:h-80' sets the size for different screen sizes
              - 'rounded-full' ensures the image is perfectly circular
              - 'overflow-hidden' clips any overflow for a neat circle
              - 'animate-float' adds a gentle floating animation
              - 'shadow-lg' gives a soft shadow for depth
              - 'profile-pulse-outline' adds a pulsing outline effect for visual emphasis
            */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden animate-float shadow-lg profile-pulse-outline">
              {/*
                Profile image itself:
                - 'w-full h-full object-cover' ensures the image fills the container and remains circular
                - 'alt' text for accessibility
              */}
              <img 
                src="assets/images/profile-matthew.jpg" 
                alt="Matthew Innes" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Profile image failed to load:', e);
                  const img = e.target as HTMLImageElement;
                  img.src = 'assets/images/newmi.png'; // Fallback image
                }}
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12 md:mt-24 flex justify-center animate-bounce">
          <a href="#about" className="text-gradient-teal hover:opacity-80 transition-opacity">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
