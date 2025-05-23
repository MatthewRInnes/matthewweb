import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from "@/components/ui/Experience";
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Advertising from '@/components/Advertising';
import ClassifiedAds from '@/components/ClassifiedAds';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Index = () => {
  const heroRef = useIntersectionObserver({ direction: 'up' });
  const statsRef = useIntersectionObserver({ direction: 'down' });
  const aboutRef = useIntersectionObserver({ direction: 'up' });
  const experienceRef = useIntersectionObserver({ direction: 'down' });
  const projectsRef = useIntersectionObserver({ direction: 'up' });
  const servicesRef = useIntersectionObserver({ direction: 'down', threshold: 0.05, rootMargin: '-100px 0px 0px 0px' });
  const testimonialsRef = useIntersectionObserver({ direction: 'up' });
  const advertisingRef = useIntersectionObserver({ direction: 'up' });
  const classifiedAdsRef = useIntersectionObserver({ direction: 'up' });
  const contactRef = useIntersectionObserver({ direction: 'down' });

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground dark:bg-navy dark:text-lightSlate">
        <Navbar />
        <main className="flex-grow pt-24">
          <div {...heroRef}><Hero /></div>
          <div {...statsRef}><Stats /></div>
          <div {...aboutRef}><About /></div>
          <div {...experienceRef}><Experience /></div>
          <div {...projectsRef}><Projects /></div>
          <div {...servicesRef}><Services /></div>
          <div {...testimonialsRef}><Testimonials /></div>
          <div {...advertisingRef}><Advertising /></div>
          <div {...classifiedAdsRef}><ClassifiedAds /></div>
          <div {...contactRef}><Contact /></div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
