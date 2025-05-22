import React from 'react';
import { Star } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const testimonials = [
  {
    name: "Marianne",
    position: "CEO, TechStart",
    content: "Matthew's work on our company website exceeded our expectations. His attention to detail and ability to translate our vision into a functional and beautiful website was impressive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    name: "Rosalind",
    position: "Marketing Director, Innovate Inc.",
    content: "Working with Matthew was a pleasure from start to finish. He understood our requirements quickly and delivered a product that perfectly matched our brand identity.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    name: "Angela",
    position: "Product Owner, DataViz",
    content: "Matthew is highly skilled and a true professional. The dashboard he developed for us has significantly improved our data visualisation capabilities and user engagement.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80"
  }
];

const Testimonials = () => {
  const titleRef = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  const testimonial1Ref = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  const testimonial2Ref = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  const testimonial3Ref = useIntersectionObserver({ direction: 'up', threshold: 0.1 });
  
  const testimonialRefs = {
    0: testimonial1Ref,
    1: testimonial2Ref,
    2: testimonial3Ref,
  };

  return (
    <section id="testimonials" className="py-16 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-12">
          <h2 
            ref={titleRef.ref}
            className={`text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4 transition-all duration-700 ${titleRef.className}`}
          >
            <span className="text-teal">04.</span> Testimonials
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const cardRef = testimonialRefs[index];
            
            return (
              <div 
                key={index}
                ref={cardRef.ref}
                className={`bg-white dark:bg-navy/80 rounded-lg p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-700 dark:border-slate/20 ${cardRef.className}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-lightestSlate">{testimonial.name}</h3>
                    <p className="text-foreground/70 dark:text-lightSlate text-sm">{testimonial.position}</p>
                  </div>
                </div>
                
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-teal fill-teal" : "text-foreground/30 dark:text-slate/30"} 
                    />
                  ))}
                </div>
                
                <p className="text-foreground dark:text-lightSlate italic font-medium">"{testimonial.content}"</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
