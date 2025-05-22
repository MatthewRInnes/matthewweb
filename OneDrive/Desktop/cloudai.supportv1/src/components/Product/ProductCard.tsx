
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white dark:bg-shop-dark/60 rounded-lg shadow-sm overflow-hidden card-hover backdrop-blur-sm border border-shop-secondary/10">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 sm:h-64 overflow-hidden relative">
          {/* Use placeholder image for development */}
          <img 
            src={process.env.NODE_ENV === 'production' ? product.image : '/images/placeholder.svg'} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="outline" className="bg-white text-shop-primary">
                Out of Stock
              </Badge>
            </div>
          )}
          
          {/* Featured tag */}
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-shop-accent text-white">
              Featured
            </Badge>
          )}

          {/* Quick view button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
            <Button variant="outline" size="sm" className="glass text-white border-white/20">
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-shop-light/50 text-shop-primary dark:bg-shop-dark dark:text-white">
            {product.category}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm ml-1">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium mb-1 text-shop-primary dark:text-white hover:text-shop-secondary transition-colors line-clamp-2 h-12">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-shop-secondary mb-2">
            £{product.price.toFixed(2)}
          </p>
        </Link>
        
        <div className="flex space-x-2">
          <Button 
            variant="default"
            size="sm"
            className="flex-1 bg-shop-secondary hover:bg-shop-secondary/90"
            disabled={!product.inStock}
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent hover:bg-shop-light dark:hover:bg-shop-dark"
            asChild
          >
            <Link to={`/product/${product.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
