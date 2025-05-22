
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/Animation/AnimatedSection";
import { StaggeredContainer } from "@/components/Animation/StaggeredContainer";

const ContactCTA = () => {
  return (
    <section className="py-16 bg-mesh dark:bg-mesh-dark">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Digital Presence?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Let's discuss how we can help your business thrive online. Contact us today for a free consultation.
            </p>
          </AnimatedSection>
          
          <StaggeredContainer className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-shop-secondary hover:bg-shop-secondary/90"
              asChild
            >
              <Link to="/contact">
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-shop-secondary text-white hover:bg-shop-secondary hover:text-white"
              asChild
            >
              <Link to="/portfolio">
                View Our Work
              </Link>
            </Button>
          </StaggeredContainer>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
