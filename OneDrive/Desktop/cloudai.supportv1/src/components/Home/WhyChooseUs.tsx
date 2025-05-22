
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Code, Globe, Star, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8 text-shop-secondary" />,
      title: "Quality Assurance",
      description: "Rigorous testing ensures every project meets our high standards for performance and user experience."
    },
    {
      icon: <Shield className="h-8 w-8 text-shop-secondary" />,
      title: "Security First",
      description: "We prioritize security at every stage of development to protect your business and customers."
    },
    {
      icon: <Code className="h-8 w-8 text-shop-secondary" />,
      title: "Clean Code",
      description: "Our well-structured code ensures your website is maintainable, scalable, and future-proof."
    },
    {
      icon: <Globe className="h-8 w-8 text-shop-secondary" />,
      title: "Global Reach",
      description: "We've worked with clients worldwide, understanding diverse markets and user expectations."
    },
    {
      icon: <Star className="h-8 w-8 text-shop-secondary" />,
      title: "Client Satisfaction",
      description: "Our high client retention rate speaks to our commitment to exceed expectations."
    },
    {
      icon: <Clock className="h-8 w-8 text-shop-secondary" />,
      title: "Timely Delivery",
      description: "We respect deadlines and keep you informed throughout the development process."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-shop-dark">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center text-shop-primary dark:text-white mb-4">Why Choose Us</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          We're committed to delivering the highest quality digital solutions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-shop-light dark:bg-shop-dark/50 p-4 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-shop-primary dark:text-white">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
