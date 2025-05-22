
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, User, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * BlogCard Component
 * 
 * Displays a summary of a blog post in a card format.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {BlogPost} props.post - The blog post data to display
 * @param {string} props.variant - Display variant ('default' or 'featured')
 */
interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  // State to track image loading errors, the image URL, and photographer info
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [photographer, setPhotographer] = useState<{ name: string; username: string } | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  /**
   * Format the publish date in a human-readable format
   * Uses locale-specific formatting with day, month, and year
   * 
   * @returns {string} Formatted date string (e.g., "15 April, 2023")
   */
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  /**
   * Fetch an appropriate Unsplash image for the blog post
   * Uses the blog category and web design context for relevance
   * Also captures photographer information for attribution
   * 
   * @async
   * @function fetchUnsplashImage
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchUnsplashImage = async () => {
      setIsImageLoading(true);
      
      // Skip if post already has a cover image
      if (post.coverImage) {
        setImageUrl(post.coverImage);
        setIsImageLoading(false);
        return;
      }
      
      try {
        // Use direct Unsplash source URL as a guaranteed way to get images
        // This is more reliable than the API for testing purposes
        const query = `web development ${post.categoryName.toLowerCase()}`;
        const fallbackImageUrl = `https://source.unsplash.com/random/800x500/?${encodeURIComponent(query)}`;
        setImageUrl(fallbackImageUrl);
        
        // Still try the API for attribution if available
        const accessKey = 'QUR0OAUM1TofVN0d6U7-dlcXh6Hr6S9LuOXg4CkF3Xw';
        
        // Make API request to Unsplash (but don't block UI on this)
        fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${accessKey}`
        ).then(response => {
          if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
          }
          return response.json();
        }).then(data => {
          // Only update URL if we got good data
          setImageUrl(data.urls.regular);
          setPhotographer({
            name: data.user.name,
            username: data.user.username
          });
          
          // Track download for Unsplash API usage reporting
          fetch(`https://api.unsplash.com/photos/${data.id}/download?client_id=${accessKey}`);
        }).catch(error => {
          console.warn('Using fallback image due to API error:', error);
          // We already set the fallback image, so we're fine
        });
        
      } catch (error) {
        console.error('Error fetching image:', error);
        // Still use a fallback direct Unsplash source URL
        const query = `web development ${post.categoryName.toLowerCase()}`;
        setImageUrl(`https://source.unsplash.com/random/800x500/?${encodeURIComponent(query)}`);
      } finally {
        setIsImageLoading(false);
      }
    };
    
    fetchUnsplashImage();
  }, [post.coverImage, post.categoryName]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageError) {
      setImageError(true);
      console.error("Image failed to load:", imageUrl);
      const target = e.target as HTMLImageElement;
      // If the image fails to load, use Unsplash source URL directly as fallback
      const query = `web development ${post.categoryName.toLowerCase()}`;
      target.src = `https://source.unsplash.com/random/800x500/?${encodeURIComponent(query)}`;
    }
    setIsImageLoading(false);
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
      variant === 'featured' ? 'border-shop-secondary/30' : ''
    } dark:bg-card dark:text-foreground`}>
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="h-48 sm:h-60 overflow-hidden relative">
          {isImageLoading && (
            <div className="w-full h-full bg-gray-200 animate-pulse dark:bg-gray-700"></div>
          )}
          
          {imageUrl && (
            <img 
              src={imageUrl}
              alt={post.title}
              className={`w-full h-full object-cover transition-transform hover:scale-105 ${isImageLoading ? 'hidden' : 'block'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          
          {/* Featured badge - only shown on featured posts */}
          {variant === 'featured' && (
            <Badge className="absolute top-2 left-2 bg-shop-accent text-white">
              Featured
            </Badge>
          )}
          
          {/* Category badge - shown on all posts */}
          <Badge variant="outline" className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            {post.categoryName}
          </Badge>
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold text-shop-primary dark:text-white hover:text-shop-secondary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pb-3">
        {/* Post excerpt with line clamping for consistent height */}
        <p className="text-muted-foreground line-clamp-3 mb-3">
          {post.excerpt}
        </p>
        
        {/* Post metadata with icons */}
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{post.authorName}</span>
          </div>
          
          {/* Photographer attribution */}
          {photographer && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Camera className="h-3 w-3 mr-1" />
              <span>Photo by <a 
                href={`https://unsplash.com/@${photographer.username}?utm_source=web_world&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-shop-secondary"
              >
                {photographer.name}
              </a> on <a 
                href="https://unsplash.com/?utm_source=web_world&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-shop-secondary"
              >
                Unsplash
              </a></span>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Tags display - limited to 3 for space */}
      <CardFooter className="pt-0 flex gap-2 flex-wrap">
        {post.tags.slice(0, 3).map((tag, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="bg-shop-light/50 hover:bg-shop-light dark:bg-shop-dark dark:hover:bg-shop-dark/80 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
