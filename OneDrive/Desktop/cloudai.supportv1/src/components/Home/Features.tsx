
import { Code, Shield, Search, Clock } from "lucide-react";

const Features = () => {
  return (
    <section className="py-12 bg-white dark:bg-shop-dark border-b border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-shop-light dark:bg-shop-dark/50 p-3 rounded-full">
              <Code className="h-6 w-6 text-shop-secondary" />
            </div>
            <div>
              <h3 className="font-medium text-shop-primary dark:text-white mb-1">Modern Technologies</h3>
              <p className="text-muted-foreground text-sm">Latest frameworks & tools</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-shop-light dark:bg-shop-dark/50 p-3 rounded-full">
              <Shield className="h-6 w-6 text-shop-secondary" />
            </div>
            <div>
              <h3 className="font-medium text-shop-primary dark:text-white mb-1">Security Focus</h3>
              <p className="text-muted-foreground text-sm">Protection from threats</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-shop-light dark:bg-shop-dark/50 p-3 rounded-full">
              <Search className="h-6 w-6 text-shop-secondary" />
            </div>
            <div>
              <h3 className="font-medium text-shop-primary dark:text-white mb-1">SEO Optimized</h3>
              <p className="text-muted-foreground text-sm">Better search rankings</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-shop-light dark:bg-shop-dark/50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-shop-secondary" />
            </div>
            <div>
              <h3 className="font-medium text-shop-primary dark:text-white mb-1">Timely Delivery</h3>
              <p className="text-muted-foreground text-sm">Projects completed on schedule</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
