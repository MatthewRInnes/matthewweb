
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const JourneySection = () => {
  const stories = [
    {
      title: "From Local Shop to Global Brand",
      content: "Our journey began in a small workshop, handcrafting quality products for local customers. Today, we serve clients worldwide while maintaining the same commitment to quality.",
      image: "/images/web-development.jpg"
    },
    {
      title: "Innovation at Our Core",
      content: "We're committed to staying at the cutting edge of web technologies and design trends, ensuring your projects are built with the latest and most effective solutions.",
      image: "/images/web-design.jpg"
    },
    {
      title: "Supporting Business Growth",
      content: "We partner with businesses of all sizes to create digital experiences that drive growth, engagement, and conversion. Your success is our success.",
      image: "/images/seo-services.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-shop-dark">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center text-shop-primary dark:text-white mb-12">Our Journey</h2>
        
        {stories.map((story, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center mb-16 last:mb-0`}
          >
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className={`max-w-lg ${index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                <h3 className="text-2xl font-bold mb-4 text-shop-primary dark:text-white">{story.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {story.content}
                </p>
                <Button 
                  variant="outline" 
                  className="border-shop-secondary text-shop-secondary hover:bg-shop-secondary hover:text-white"
                  asChild
                >
                  <Link to="/about">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src={story.image} 
                alt={story.title} 
                className="rounded-lg shadow-md max-w-md w-full object-cover h-64"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneySection;
