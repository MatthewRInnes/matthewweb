import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AnimatedSection } from "@/components/Animation/AnimatedSection";
import { StaggeredContainer } from "@/components/Animation/StaggeredContainer";
import { useEffect, useState } from "react";

/**
 * ProjectShowcase Component
 * 
 * Displays a carousel of recent project examples using the Unsplash API.
 * 
 * @component
 */
const ProjectShowcase = () => {
  // State to store project images data
  const [projectImages, setProjectImages] = useState<Array<{
    url: string;
    photographer: string;
    photographerUrl: string;
  }>>([]);
  
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  
  /**
   * Fetch web design related images from Unsplash API
   * Uses specific search terms related to web development and design
   */
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      
      // Web design related search terms
      const searchTerms = [
        'web design',
        'ui design',
        'responsive design',
        'website mockup',
        'web development',
        'coding workspace'
      ];
      
      try {
        // Create fallback images first to ensure we always have something to display
        const fallbackImages = searchTerms.map(term => ({
          url: `https://source.unsplash.com/random/600x600/?${encodeURIComponent(term)}`,
          photographer: 'Unsplash Photographer',
          photographerUrl: 'https://unsplash.com'
        }));
        
        setProjectImages(fallbackImages);
        
        // Try to enhance with API data for attribution
        const accessKey = 'QUR0OAUM1TofVN0d6U7-dlcXh6Hr6S9LuOXg4CkF3Xw';
        
        // Fetch images for each search term
        const promises = searchTerms.map(async (term, index) => {
          try {
            const response = await fetch(
              `https://api.unsplash.com/photos/random?query=${encodeURIComponent(term)}&client_id=${accessKey}`
            );
            
            if (!response.ok) {
              console.warn(`Unsplash API error: ${response.status}`);
              return null;
            }
            
            const data = await response.json();
            
            // Log attribution as required by Unsplash API terms
            console.log(`Photo by ${data.user.name} on Unsplash`);
            
            // Track download for Unsplash API reporting
            fetch(`https://api.unsplash.com/photos/${data.id}/download?client_id=${accessKey}`);
            
            return {
              url: data.urls.regular,
              photographer: data.user.name,
              photographerUrl: data.user.links.html
            };
          } catch (error) {
            console.warn(`Using fallback image for "${term}":`, error);
            return null;
          }
        });
        
        const results = await Promise.all(promises);
        
        // Update with API data where available, keeping fallbacks otherwise
        const updatedImages = fallbackImages.map((fallback, index) => {
          return results[index] || fallback;
        });
        
        setProjectImages(updatedImages);
      } catch (error) {
        console.error('Error fetching project images:', error);
        // Fallback images already set
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  return (
    <section className="py-16 bg-shop-light dark:bg-shop-dark/90">
      <div className="container-custom">
        <AnimatedSection direction="up">
          <h2 className="text-3xl font-bold text-center text-shop-primary dark:text-white mb-4">Recent Projects</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Take a look at some of our recent work for clients across various industries
          </p>
        </AnimatedSection>
        
        <AnimatedSection direction="right" delay={0.2}>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {isLoading ? (
                // Loading skeletons while images are being fetched
                Array(6).fill(0).map((_, index) => (
                  <CarouselItem key={`skeleton-${index}`} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="border-none overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden rounded-md bg-gray-200 animate-pulse dark:bg-gray-700"></div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                projectImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="border-none overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative group aspect-square overflow-hidden rounded-md">
                          <img 
                            src={image.url}
                            alt={`Project showcase ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // Fallback if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.src = `https://source.unsplash.com/random/600x600/?website`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end">
                            <div className="p-4 text-white w-full">
                              <p className="font-medium">Project {index + 1}</p>
                              <p className="text-sm text-white/80">Web Development</p>
                              <div className="mt-2 text-xs text-white/70">
                                Photo by {image.photographer} on Unsplash
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.4}>
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-shop-secondary text-shop-secondary hover:bg-shop-secondary hover:text-white"
              asChild
            >
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProjectShowcase;
