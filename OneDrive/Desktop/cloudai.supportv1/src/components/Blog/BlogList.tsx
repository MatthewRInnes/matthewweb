
import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Grid3X3, List } from 'lucide-react';

/**
 * BlogList Component
 * 
 * Displays a list of blog posts with filtering and sorting options.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {BlogPost[]} props.posts - Array of blog post objects to display
 * @param {string} props.title - Optional title to display above the blog list
 * @param {boolean} props.showFilters - Whether to show filtering and sorting controls
 * 
 * Features:
 * - Grid/List view toggle for different display options
 * - Text search filtering across title, excerpt, and tags
 * - Category filtering with dropdown selection
 * - Various sort options (recent, oldest, title A-Z/Z-A, read time)
 * - Responsive layout for different screen sizes
 * - Dynamic category extraction from available posts
 * - Empty state handling when no posts match filters
 */
interface BlogListProps {
  posts: BlogPost[];
  title?: string;
  showFilters?: boolean;
}

const BlogList = ({ posts, title, showFilters = true }: BlogListProps) => {
  // State for view mode, sorting, search and category filtering
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  /**
   * Extract unique categories from the blog posts
   * 
   * @constant
   * @type {string[]}
   */
  const categories = Array.from(new Set(posts.map(post => post.categoryName)));
  
  /**
   * Filter and sort posts based on user selections
   * Applies search, category and sorting criteria
   * 
   * @constant
   * @type {BlogPost[]}
   */
  const filteredPosts = posts.filter(post => {
    // Filter by search query (case insensitive)
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by category (all or specific category)
    const matchesCategory = selectedCategory === 'all' || post.categoryName === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Sort posts based on selected sort option
    switch (sortBy) {
      case 'recent':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'read-time':
        return a.readTime - b.readTime;
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return (
    <div>
      {/* Title section with separator */}
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-shop-primary dark:text-white">{title}</h2>
          <Separator className="mt-4" />
        </div>
      )}

      {/* Filters and controls section */}
      {showFilters && (
        <div className="mb-6 space-y-4">
          {/* Search bar with icon - reduced width */}
          <div className="relative max-w-xs">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          
          {/* View toggle, category filter and sort options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              {/* Grid/List view toggle buttons */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-shop-secondary text-white' : ''}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-shop-secondary text-white' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
              
              {/* Category filter dropdown - reduced width */}
              {categories.length > 0 && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Sort options dropdown - reduced width */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="title-asc">Title: A-Z</SelectItem>
                <SelectItem value="title-desc">Title: Z-A</SelectItem>
                <SelectItem value="read-time">Read time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Blog post grid/list layout */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-6'
      }>
        {filteredPosts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            variant={post.featured ? 'featured' : 'default'}
          />
        ))}
      </div>

      {/* Empty state message */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No blog posts found.</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
