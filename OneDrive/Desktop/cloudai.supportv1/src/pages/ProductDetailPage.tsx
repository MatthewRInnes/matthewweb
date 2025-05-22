import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { getProductById, getProductsByCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { 
  Heart, Star, Share, ChevronRight, 
  Info, Mail, Phone, ExternalLink, 
  MessageCircle, User, Shield 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProductCard from "@/components/Product/ProductCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

/**
 * ProductDetailPage Component
 * 
 * This page displays detailed information about a specific product.
 */
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      console.log('Looking for product with ID:', id); // Debug log
      const foundProduct = getProductById(id);
      console.log('Found product:', foundProduct); // Debug log
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError(`Product with ID "${id}" not found`);
      }
      setLoading(false);
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-8">{error || "Sorry, we couldn't find the product you're looking for."}</p>
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to wishlist`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setContactForm({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Get related products from same category
  const relatedAdverts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
    
  // Format the rating stars
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={cn(
              "h-4 w-4", 
              star <= Math.floor(rating) 
                ? "text-amber-400 fill-amber-400" 
                : star <= rating 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-2 text-muted-foreground">
          ({product.reviews} reviews)
        </span>
      </div>
    );
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-shop-light py-3">
        <div className="container-custom">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/products" className="hover:underline">Advertisements</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to={`/category/${product.category}`} className="hover:underline">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-shop-primary">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Advertisement Details */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Advertisement Images */}
          <div className="bg-shop-light rounded-lg p-6 flex items-center justify-center">
            <img 
              src={process.env.NODE_ENV === 'production' ? product.image : '/images/placeholder.svg'} 
              alt={product.name} 
              className="max-h-96 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          {/* Advertisement Information */}
          <div>
            <div className="mb-6">
              <Badge variant="outline" className="bg-shop-light mb-2">
                {product.category}
              </Badge>
              
              <h1 className="text-3xl font-bold text-shop-primary mb-2">
                {product.name}
              </h1>
              
              {renderRatingStars(product.rating)}
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-shop-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock ? (
                  <Badge className="ml-3 bg-green-100 text-green-800 border-green-200">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-3 bg-red-100 text-red-800 border-red-200">
                    Unavailable
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              {product.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                className="flex-1 bg-shop-secondary hover:bg-shop-secondary/90"
                size="lg"
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Advertiser
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Save
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toast.success("Advertisement link copied!")}
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Advertiser Features */}
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-shop-light p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-shop-secondary" />
                </div>
                <p className="text-sm">Premium Advertiser</p>
              </div>
              <div className="flex items-center">
                <div className="bg-shop-light p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-shop-secondary" />
                </div>
                <p className="text-sm">Fast Response (Usually within 24h)</p>
              </div>
              <div className="flex items-center">
                <div className="bg-shop-light p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-shop-secondary" />
                </div>
                <p className="text-sm">Verified Business</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="border-b w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Details</TabsTrigger>
              <TabsTrigger value="contact" id="contact-form">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.</p>
                <ul>
                  <li>High-quality materials</li>
                  <li>Designed for everyday use</li>
                  <li>Durable construction</li>
                  <li>Modern aesthetic</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-shop-light rounded-lg p-6">
                  <h3 className="font-medium text-lg mb-4">Advertisement Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference</span>
                      <span className="font-medium">WW-{product.id}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listed Date</span>
                      <span className="font-medium">June 15, 2023</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium">{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-shop-light rounded-lg p-6">
                  <h3 className="font-medium text-lg mb-4">Advertiser Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <User className="h-5 w-5 text-shop-secondary mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium block">WebWorld Solutions</span>
                        <span className="text-sm text-muted-foreground">Member since 2020</span>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <Mail className="h-5 w-5 text-shop-secondary mr-2 flex-shrink-0" />
                      <span>contact@webworld.example.com</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="h-5 w-5 text-shop-secondary mr-2 flex-shrink-0" />
                      <span>+44 1234 567890</span>
                    </li>
                    <li className="flex items-center">
                      <ExternalLink className="h-5 w-5 text-shop-secondary mr-2 flex-shrink-0" />
                      <a href="#" className="text-shop-secondary hover:underline">www.webworld.example.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contact" className="py-6">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Contact About This Advertisement</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={contactForm.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={contactForm.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      value={contactForm.message} 
                      onChange={handleInputChange} 
                      required 
                      placeholder={`I'm interested in ${product.name}. Please provide more information.`}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-shop-secondary hover:bg-shop-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-shop-primary">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedAdverts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
