/**
 * Services Component
 * A showcase of professional services offered with dynamic image loading and animations.
 * Features a responsive grid layout with interactive cards and loading states.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Database, Layout, Server, Smartphone, Globe, Shield, Zap,
  Briefcase, Brain, Mail, FileText, Video, MessageSquare, BarChart, 
  Cpu, Image, LineChart, ShoppingCart, Wrench, School, Globe2, 
  Accessibility
} from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Services = () => {
  // State management for images and loading status
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Shared observer: track which cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(24).fill(false));
  // Create an array of refs for each card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Array of unique fallback images for each service (placed at top level for access in all functions)
  const defaultImages = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', // Web Development
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c', // Database Design
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', // UI/UX Design
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // Backend Development
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', // Mobile Development
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', // Cloud Solutions
    'https://images.unsplash.com/photo-1503676382389-4809596d5290', // Security
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', // Performance Optimisation
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', // Brand Strategy
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', // Social Media Packs
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c', // Content Creation
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // Email Marketing
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', // AI & ML
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', // Chatbot Development
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', // Automation Services
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', // API Integration
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', // E-commerce Solutions
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c', // Penetration Testing
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // GDPR Compliance
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', // Motion Graphics
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99', // Information Graphics
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', // Audio Branding
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', // Training & Workshops
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c', // Accessibility Services
  ];

  useEffect(() => {
    // Set up a single IntersectionObserver for all cards
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              if (prev[index]) return prev; // Already visible
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.05, // Trigger as soon as card is slightly visible
        rootMargin: '0px', // No offset, trigger immediately
      }
    );
    // Observe each card
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Intersection observers for animation triggers
  // Added rootMargin to trigger animations earlier, accounting for fixed navbar height
  const titleRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1, rootMargin: '-40px 0px 0px 0px' });
  const descriptionRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.1, rootMargin: '-40px 0px 0px 0px' });
  
  // Array of available services with their details
  const services = [
    // Original services
    {
      title: "Web Development",
      description: "Creating responsive and modern web applications using the latest technologies.",
      icon: <Code2 className="w-6 h-6" />,
      query: "web development code"
    },
    {
      title: "Database Design",
      description: "Designing efficient and scalable database solutions for your applications.",
      icon: <Database className="w-6 h-6" />,
      query: "database server"
    },
    {
      title: "UI/UX Design",
      description: "Crafting intuitive and engaging user interfaces with modern design principles.",
      icon: <Layout className="w-6 h-6" />,
      query: "ui design interface"
    },
    {
      title: "Backend Development",
      description: "Building robust and scalable server-side applications and APIs.",
      icon: <Server className="w-6 h-6" />,
      query: "backend server code"
    },
    {
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="w-6 h-6" />,
      query: "mobile app development"
    },
    {
      title: "Cloud Solutions",
      description: "Implementing cloud-based solutions for scalability and reliability.",
      icon: <Globe className="w-6 h-6" />,
      query: "cloud computing server"
    },
    {
      title: "Security",
      description: "Implementing robust security measures to protect your applications.",
      icon: <Shield className="w-6 h-6" />,
      query: "cybersecurity protection"
    },
    {
      title: "Performance Optimisation",
      description: "Optimising applications for maximum speed and efficiency.",
      icon: <Zap className="w-6 h-6" />,
      query: "performance optimisation speed"
    },
    // Creative & Marketing Services
    {
      title: "Brand Strategy & Development",
      description: "Help clients build a strong brand identity and market presence.",
      icon: <Briefcase className="w-6 h-6" />,
      query: "brand strategy marketing"
    },
    {
      title: "Social Media Packs",
      description: "Comprehensive social media management and content creation packages.",
      icon: <MessageSquare className="w-6 h-6" />,
      query: "social media marketing"
    },
    {
      title: "Content Creation",
      description: "Blog writing, copywriting, SEO content, and content planning.",
      icon: <FileText className="w-6 h-6" />,
      query: "content creation writing"
    },
    {
      title: "Email Marketing",
      description: "Design and implement effective email marketing campaigns.",
      icon: <Mail className="w-6 h-6" />,
      query: "email marketing campaign"
    },
    // Advanced Tech & AI Services
    {
      title: "AI & Machine Learning",
      description: "Custom AI solutions and predictive analytics systems.",
      icon: <Brain className="w-6 h-6" />,
      query: "ai machine learning"
    },
    {
      title: "Chatbot Development",
      description: "Intelligent chatbot solutions for customer service and automation.",
      icon: <MessageSquare className="w-6 h-6" />,
      query: "chatbot development"
    },
    {
      title: "Automation Services",
      description: "Business process automation and workflow optimisation.",
      icon: <Cpu className="w-6 h-6" />,
      query: "business automation"
    },
    // Technical Development Services
    {
      title: "API Integration",
      description: "Seamless integration of third-party APIs and services.",
      icon: <Wrench className="w-6 h-6" />,
      query: "api integration"
    },
    {
      title: "E-commerce Solutions",
      description: "Custom e-commerce platforms and online store development.",
      icon: <ShoppingCart className="w-6 h-6" />,
      query: "ecommerce development"
    },
    // Cybersecurity & Compliance
    {
      title: "Penetration Testing",
      description: "Comprehensive security testing and vulnerability assessment.",
      icon: <Shield className="w-6 h-6" />,
      query: "penetration testing security"
    },
    {
      title: "GDPR Compliance",
      description: "Ensure your business meets data protection regulations.",
      icon: <FileText className="w-6 h-6" />,
      query: "gdpr compliance"
    },
    // Specialist Design Services
    {
      title: "Motion Graphics",
      description: "Dynamic and engaging motion graphics for digital content.",
      icon: <Video className="w-6 h-6" />,
      query: "motion graphics animation"
    },
    {
      title: "Information Graphics",
      description: "Clear and effective data visualisation and infographics.",
      icon: <BarChart className="w-6 h-6" />,
      query: "infographic design"
    },
    {
      title: "Audio Branding",
      description: "Create unique audio identities for your brand.",
      icon: <Globe2 className="w-6 h-6" />,
      query: "audio branding"
    },
    // Additional Services
    {
      title: "Training & Workshops",
      description: "Technical training and workshops for teams and individuals.",
      icon: <School className="w-6 h-6" />,
      query: "technical training workshop"
    },
    {
      title: "Accessibility Services",
      description: "Make your digital products accessible to all users.",
      icon: <Accessibility className="w-6 h-6" />,
      query: "web accessibility"
    }
  ];

  // Effect hook for fetching service-related images
  useEffect(() => {
    async function fetchImages() {
      const fetchedImages = await Promise.all(services.map(async (service, idx) => {
        try {
          const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(service.query)}&per_page=1`,
            {
              headers: {
                Authorization: import.meta.env.VITE_PEXELS_API_KEY,
              },
            }
          );
          if (!response.ok) {
            console.warn(`Pexels API error for ${service.title}: ${response.status}`);
            return defaultImages[idx % defaultImages.length];
          }
          const data = await response.json();
          if (data.photos && data.photos.length > 0) {
            return data.photos[0].src.medium;
          } else {
            // Warn if no image found for this service
            console.warn(`No image found for service: ${service.title}`);
            return defaultImages[idx % defaultImages.length];
          }
        } catch (error) {
          // Warn if fetch fails
          console.warn(`Error fetching image for ${service.title}:`, error);
          return defaultImages[idx % defaultImages.length];
        }
      }));
      setImages(fetchedImages);
      setLoading(false);
    }

    fetchImages();
  }, []);

  return (
    // Main services section container
    <section id="services" className="py-16 bg-background dark:bg-navy">
      {/* Debug border and background removed for production */}
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 
            ref={titleRef.ref}
            className={`text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4 transition-all duration-700 ${titleRef.className}`}
          >
            <span className="text-teal">03.</span> Services
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>

        {/* Section description */}
        <p 
          ref={descriptionRef.ref}
          className={`text-lg text-foreground/70 dark:text-lightSlate mb-12 max-w-3xl transition-all duration-700 ${descriptionRef.className}`}
        >
          I offer a comprehensive range of services to help bring your digital projects to life. From web development to creative marketing and AI solutions, I'm here to help you achieve your goals.
        </p>

        {/* Services grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            // Always use a fallback image if images[index] is undefined
            const imageUrl = images[index] || defaultImages[index] || 'https://via.placeholder.com/300x200?text=Service';
            const isMissing = !images[index] && !loading;
            return (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className={`bg-white dark:bg-navy/80 rounded-lg overflow-hidden shadow-lg border border-border dark:border-slate/20 transition-all duration-700 ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="relative h-48">
                  {loading ? (
                    <div className="w-full h-full bg-secondary dark:bg-navy/60 animate-pulse"></div>
                  ) : (
                    <img
                      src={imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Show a warning if the image is missing */}
                  {isMissing && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-red-500 font-bold bg-white/80 rounded px-2 py-1">Image missing</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground dark:text-lightestSlate mb-2">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 dark:text-lightSlate">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image attribution footer */}
        <div className="mt-12 text-center text-sm text-foreground/50 dark:text-slate/50">
          Images powered by <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">Pexels</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
