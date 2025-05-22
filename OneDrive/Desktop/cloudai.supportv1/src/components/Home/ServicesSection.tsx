
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon, Monitor, Code, Shield, Search, Layers, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkTo: string;
}

const ServiceCard = ({ icon: Icon, title, description, linkTo }: ServiceCardProps) => (
  <Card className="border-none shadow-md hover:shadow-lg transition-all group">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-4 rounded-full bg-shop-light dark:bg-shop-dark/50 group-hover:bg-shop-secondary group-hover:text-white transition-colors">
          <Icon className="h-8 w-8 text-shop-secondary group-hover:text-white" />
        </div>
        <h3 className="font-bold text-lg mb-2 text-shop-primary dark:text-white">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button
          variant="outline"
          className="border-shop-secondary text-shop-secondary hover:bg-shop-secondary hover:text-white"
          asChild
        >
          <Link to={linkTo}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ServicesSection = () => {
  const services = [
    {
      icon: Monitor,
      title: "Web Design",
      description: "Beautiful, responsive websites that captivate your audience and reflect your brand identity",
      linkTo: "/services#web-design"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern technologies for optimal performance",
      linkTo: "/services#web-development"
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Protect your digital assets with comprehensive security solutions and best practices",
      linkTo: "/services#cyber-security"
    },
    {
      icon: Search,
      title: "SEO Services",
      description: "Improve your visibility online and drive more organic traffic to your website",
      linkTo: "/services#seo"
    },
    {
      icon: Layers,
      title: "Templates & Graphics",
      description: "Professional templates and custom graphics to enhance your brand and marketing",
      linkTo: "/products"
    },
    {
      icon: PenTool,
      title: "Custom Solutions",
      description: "Tailored digital solutions designed specifically for your unique business needs",
      linkTo: "/services#custom"
    }
  ];

  return (
    <section className="py-16 bg-shop-light dark:bg-shop-dark/90">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web solutions to help your business thrive in the digital landscape
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            className="bg-shop-secondary hover:bg-shop-secondary/90"
            asChild
          >
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
