
import { useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * ProductGrid Component
 * 
 * Displays a grid of product cards with sorting and view options.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Product[]} props.products - Array of product objects to display
 * @param {string} props.title - Optional title to display above the product grid
 * 
 * Features:
 * - Grid/List view toggle for different display options
 * - Sorting options (featured, price low-high, price high-low, rating)
 * - Filter button for future filtering implementation
 * - Responsive layout adjusting to different screen sizes
 * - Empty state handling when no products are found
 * - Optimized sorting algorithm for product display
 * - Enhanced dark mode styling for better visibility
 */
interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  // State for view mode and sorting
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  /**
   * Sort products based on selected option
   * 
   * @function
   * @returns {Product[]} Sorted array of products
   */
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.featured ? 1 : -1; // Featured products first
    }
  });

  return (
    <div className="bg-background dark:bg-[var(--background-color)]">
      {/* Title section with separator */}
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-shop-primary dark:text-[var(--text-color)]">{title}</h2>
          <Separator className="mt-4 dark:bg-[var(--border-color)]" />
        </div>
      )}

      {/* View controls and sorting options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          {/* Grid/List view toggle buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' 
              ? 'bg-shop-secondary text-white dark:bg-shop-secondary dark:text-white' 
              : 'dark:border-[var(--border-color)] dark:text-[var(--text-color)]'
            }
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' 
              ? 'bg-shop-secondary text-white dark:bg-shop-secondary dark:text-white' 
              : 'dark:border-[var(--border-color)] dark:text-[var(--text-color)]'
            }
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="dark:border-[var(--border-color)] dark:text-[var(--text-color)]"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        {/* Sort options dropdown - reduced width */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px] dark:border-[var(--border-color)] dark:bg-[var(--input-bg)] dark:text-[var(--text-color)]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[var(--card-bg)] dark:border-[var(--border-color)]">
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product grid/list layout */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
        : 'space-y-4'
      }>
        {sortedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Empty state message */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-[var(--text-color)]/60">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
