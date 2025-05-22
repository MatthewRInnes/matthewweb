import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from "@/components/Layout/Layout";
import { AnimatedSection } from '@/components/Animation/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, SlidersHorizontal, XCircle, Info } from 'lucide-react';
import { getAllAdverts, getAllCategories } from '@/data/products';

/**
 * ProductsPage Component
 * 
 * This page displays all products with comprehensive filtering options.
 */
export const ProductsPage = () => {
  // Get all products from data store
  const allProducts = getAllAdverts();
  const allCategories = getAllCategories();
  
  // Get and set URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlQuery = searchParams.get('q') || '';
  
  // State for filters and products
  const [activeTab, setActiveTab] = useState(urlCategory); 
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Handle category tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL parameters
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL parameters
    if (searchQuery.trim() === '') {
      searchParams.delete('q');
    } else {
      searchParams.set('q', searchQuery);
    }
    setSearchParams(searchParams);
  };

  // Filter products based on category and search query
  useEffect(() => {
    let filtered = allProducts;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(product => product.category === activeTab);
    }
    
    if (urlQuery) {
      const query = urlQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeTab, urlQuery, allProducts]);

  return (
    <Layout>
      {/* Hero Section */}
      <AnimatedSection direction="up">
        <section className="bg-gradient-to-br from-shop-primary via-shop-primary/90 to-shop-secondary/80 py-16 dark:bg-gradient-mesh-dark">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Browse Products</h1>
              <p className="text-white/90 text-lg mb-8">
                Discover premium templates and marketing assets for your business
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      {/* Products Section */}
      <AnimatedSection direction="up">
        <section className="py-16">
          <div className="container-custom">
            {/* Search and Filter */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>

              {/* Category Tabs */}
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap justify-start sm:justify-center">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  {allCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="h-48 sm:h-64 bg-shop-light flex items-center justify-center p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="bg-shop-light/50 text-shop-primary dark:bg-shop-dark dark:text-white mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="font-medium mb-1 text-shop-primary dark:text-white line-clamp-2 h-12">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-shop-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.inStock ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                  setSearchParams({});
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>
    </Layout>
  );
};
