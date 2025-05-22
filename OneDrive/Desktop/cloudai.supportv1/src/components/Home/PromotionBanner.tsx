
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PromotionBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-shop-secondary to-shop-accent text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Advertise With Us</h2>
            <p className="text-white/80 text-lg mb-6">
              Get 15% off your first advertising campaign when you contact us this month. Limited time offer for new clients.
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-shop-secondary"
              asChild
            >
              <Link to="/contact">
                Start Advertising
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white/20 rounded-full flex items-center justify-center animate-pulse-gentle">
              <div className="text-center">
                <p className="text-xl">Save</p>
                <p className="text-4xl md:text-5xl font-bold">15%</p>
                <p className="text-xl">Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
