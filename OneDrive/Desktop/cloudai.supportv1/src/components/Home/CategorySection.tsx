
import { Link } from "react-router-dom";
import { getAllCategories } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CategorySection = () => {
  const categories = getAllCategories();
  
  // Category icons/images would normally be dynamic - using placeholder for now
  const getCategoryImage = () => "/images/placeholder.svg";

  return (
    <section className="py-16 bg-shop-light">
      <div className="container-custom">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-shop-primary mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Discover our curated collection of products</p>
          </div>
          <Link 
            to="/categories" 
            className="flex items-center text-shop-secondary hover:underline mt-4 md:mt-0"
          >
            View all categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link to={`/category/${category}`} key={category}>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={getCategoryImage()} 
                      alt={category} 
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-white font-medium">{category}</h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
