
import { useState } from 'react';
import { Product } from '@/types/product';
import AdvertCard from './AdvertCard';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * AdvertGrid Component
 * 
 * Displays a grid of advertisement cards with sorting and view options.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Product[]} props.adverts - Array of advertisement objects to display
 * @param {string} props.title - Optional title to display above the advert grid
 */
interface AdvertGridProps {
  adverts: Product[];
  title?: string;
}

const AdvertGrid = ({ adverts, title }: AdvertGridProps) => {
  // State for view mode and sorting
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  /**
   * Sort adverts based on selected option
   * 
   * @function
   * @returns {Product[]} Sorted array of adverts
   */
  const sortedAdverts = [...adverts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.featured ? 1 : -1; // Featured adverts first
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

      {/* Advert grid/list layout */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
        : 'space-y-4'
      }>
        {sortedAdverts.map((advert) => (
          <div key={advert.id}>
            <AdvertCard advert={advert} />
          </div>
        ))}
      </div>

      {/* Empty state message */}
      {adverts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-[var(--text-color)]/60">No advertisements found.</p>
        </div>
      )}
    </div>
  );
};

export default AdvertGrid;
