import React from 'react';
import { Mail } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Advertising = () => {
  const titleRef = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  const adSpace1Ref = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  const adSpace2Ref = useIntersectionObserver({ direction: 'up', threshold: 0.1 });

  return (
    <section id="advertising" className="py-16 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 
            ref={titleRef.ref}
            className={`text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4 transition-all duration-700 ${titleRef.className}`}
          >
            <span className="text-teal">05.</span> Advertising Space
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>

        {/* Advertising message */}
        <div className="text-center mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Do you want your company seen worldwide?
          </h3>
          <p className="text-foreground/70 dark:text-lightSlate mb-6">
            Advertise your business in these premium spaces and reach a global audience.
          </p>
          <a 
            href="mailto:matthewinnes42@gmail.com" 
            className="inline-flex items-center text-teal hover:text-teal/80 transition-colors"
          >
            <Mail className="mr-2" size={20} />
            Contact me for more information at matthewinnes42@gmail.com
          </a>
        </div>

        {/* Ad spaces */}
        <div className="grid gap-8">
          {/* First ad space */}
          <div 
            ref={adSpace1Ref.ref}
            className={`bg-white/80 dark:bg-navy/80 rounded-lg p-8 border-2 border-dashed border-teal/30 transition-all duration-700 ${adSpace1Ref.className}`}
          >
            <div className="h-48 flex items-center justify-center">
              <p className="text-foreground/50 dark:text-lightSlate/50 text-center">
                Premium Advertising Space 1
              </p>
            </div>
          </div>

          {/* Second ad space */}
          <div 
            ref={adSpace2Ref.ref}
            className={`bg-white/80 dark:bg-navy/80 rounded-lg p-8 border-2 border-dashed border-teal/30 transition-all duration-700 ${adSpace2Ref.className}`}
          >
            <div className="h-48 flex items-center justify-center">
              <p className="text-foreground/50 dark:text-lightSlate/50 text-center">
                Premium Advertising Space 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertising; 