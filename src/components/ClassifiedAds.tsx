import React from 'react';
import { Mail } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const ClassifiedAds = () => {
  const titleRef = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  const adRefs = {
    large: useIntersectionObserver({ direction: 'up', threshold: 0.1 }),
    medium1: useIntersectionObserver({ direction: 'up', threshold: 0.1 }),
    medium2: useIntersectionObserver({ direction: 'up', threshold: 0.1 }),
    small1: useIntersectionObserver({ direction: 'up', threshold: 0.1 }),
    small2: useIntersectionObserver({ direction: 'up', threshold: 0.1 }),
    small3: useIntersectionObserver({ direction: 'up', threshold: 0.1 }),
  };

  return (
    <section id="classified-ads" className="py-16 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 
            ref={titleRef.ref}
            className={`text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4 transition-all duration-700 ${titleRef.className}`}
          >
            <span className="text-teal">06.</span> Classified Advertisements
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>

        {/* Advertising message */}
        <div className="text-center mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Showcase Your Business to a Global Audience
          </h3>
          <p className="text-foreground/70 dark:text-lightSlate mb-6">
            Choose from our range of advertising spaces to promote your business worldwide.
          </p>
          <a 
            href="mailto:matthewinnes42@gmail.com" 
            className="inline-flex items-center text-teal hover:text-teal/80 transition-colors"
          >
            <Mail className="mr-2" size={20} />
            Contact me for more information at matthewinnes42@gmail.com
          </a>
        </div>

        {/* Ad spaces grid */}
        <div className="grid gap-8">
          {/* Large ad space */}
          <div 
            ref={adRefs.large.ref}
            className={`bg-white/80 dark:bg-navy/80 rounded-lg p-8 border-2 border-dashed border-teal/30 transition-all duration-700 ${adRefs.large.className}`}
          >
            <div className="h-64 flex items-center justify-center">
              <p className="text-foreground/50 dark:text-lightSlate/50 text-center">
                Large Advertisement Space (728x90)
              </p>
            </div>
          </div>

          {/* Medium ad spaces */}
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              ref={adRefs.medium1.ref}
              className={`bg-white/80 dark:bg-navy/80 rounded-lg p-8 border-2 border-dashed border-teal/30 transition-all duration-700 ${adRefs.medium1.className}`}
            >
              <div className="h-48 flex items-center justify-center">
                <p className="text-foreground/50 dark:text-lightSlate/50 text-center">
                  Medium Advertisement Space (300x250)
                </p>
              </div>
            </div>
            <div 
              ref={adRefs.medium2.ref}
              className={`bg-white/80 dark:bg-navy/80 rounded-lg p-8 border-2 border-dashed border-teal/30 transition-all duration-700 ${adRefs.medium2.className}`}
            >
              <div className="h-48 flex items-center justify-center">
                <p className="text-foreground/50 dark:text-lightSlate/50 text-center">
                  Medium Advertisement Space (300x250)
                </p>
              </div>
            </div>
          </div>

          {/* Small ad spaces */}
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              ref={adRefs.small1.ref}
              className={`bg-white/80 dark:bg-navy/80 rounded-lg p-6 border-2 border-dashed border-teal/30 transition-all duration-700 ${adRefs.small1.className}`}
            >
              <div className="h-32 flex items-center justify-center">
                <p className="text-foreground/50 dark:text-lightSlate/50 text-center text-sm">
                  Small Advertisement Space (160x600)
                </p>
              </div>
            </div>
            <div 
              ref={adRefs.small2.ref}
              className={`bg-white/80 dark:bg-navy/80 rounded-lg p-6 border-2 border-dashed border-teal/30 transition-all duration-700 ${adRefs.small2.className}`}
            >
              <div className="h-32 flex items-center justify-center">
                <p className="text-foreground/50 dark:text-lightSlate/50 text-center text-sm">
                  Small Advertisement Space (160x600)
                </p>
              </div>
            </div>
            <div 
              ref={adRefs.small3.ref}
              className={`bg-white/80 dark:bg-navy/80 rounded-lg p-6 border-2 border-dashed border-teal/30 transition-all duration-700 ${adRefs.small3.className}`}
            >
              <div className="h-32 flex items-center justify-center">
                <p className="text-foreground/50 dark:text-lightSlate/50 text-center text-sm">
                  Small Advertisement Space (160x600)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassifiedAds; 