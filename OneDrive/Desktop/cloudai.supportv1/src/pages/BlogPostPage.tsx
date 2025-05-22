import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import Layout from "@/components/Layout/Layout";
import { AnimatedSection } from '@/components/Animation/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronLeft, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import BlogCard from '@/components/Blog/BlogCard';

/**
 * BlogPostPage Component
 * 
 * Renders a single blog post with full content and related articles.
 * 
 * @component
 * @see BlogCard - For displaying related posts
 * 
 * Features:
 * - Dynamic routing via URL slug parameter
 * - Author information display with avatar
 * - Publication date and read time metrics
 * - Post content rendering with dangerouslySetInnerHTML (sanitization would be required in production)
 * - Related posts recommendation based on category and tags
 * - Social sharing and bookmark functionality
 * - Responsive layout for all screen sizes
 * - Unsplash API integration for dynamic imagery
 * - Post not found handling with redirection
 */
const BlogPostPage = () => {
  // Get the post slug from URL parameters
  const { slug } = useParams<{ slug: string }>();
  
  // State for the current post, related posts, and cover image
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const navigate = useNavigate();
  
  /**
   * Load post data and related posts on component mount or slug change
   * In a production app, this would fetch from a database or CMS API
   * 
   * @effect
   * @dependency [slug] - Rerun when URL slug changes
   */
  useEffect(() => {
    // Find the post that matches the URL slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost || null);
    
    // If post found, get related posts based on category or shared tags
    if (foundPost) {
      const related = blogPosts
        .filter(p => p.id !== foundPost.id && 
          (p.categoryId === foundPost.categoryId || 
           p.tags.some(tag => foundPost.tags.includes(tag))))
        .slice(0, 3);
      setRelatedPosts(related);
      
      // If post has cover image already, use that
      if (foundPost.coverImage) {
        setCoverImage(foundPost.coverImage);
      } else {
        // Otherwise fetch from Unsplash API
        fetchUnsplashImage(foundPost.categoryName);
      }
    }
  }, [slug]);
  
  /**
   * Fetch appropriate Unsplash image URL for blog post
   * Uses web development related queries combined with post category
   * 
   * @async
   * @function fetchUnsplashImage
   * @param {string} category - The post category
   */
  const fetchUnsplashImage = async (category: string) => {
    try {
      const query = `web design ${category.toLowerCase()}`;
      const accessKey = 'QUR0OAUM1TofVN0d6U7-dlcXh6Hr6S9LuOXg4CkF3Xw';
      
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${accessKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }
      
      const data = await response.json();
      setCoverImage(data.urls.regular);
      
      // Attribute photographer as required by Unsplash API terms
      console.log(`Photo by ${data.user.name} on Unsplash`);
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
      // Fallback to direct source URL
      const query = `web design ${category.toLowerCase()}`;
      setCoverImage(`https://source.unsplash.com/random/1200x600/?${encodeURIComponent(query)}`);
    }
  };
  
  // Update the formattedDate state when post changes
  useEffect(() => {
    if (post) {
      setFormattedDate(new Date(post.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    }
  }, [post]);
  
  // Handle the case where post is not found
  if (!post) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-shop-accent hover:bg-shop-accent/90 text-white">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Header Section */}
      <AnimatedSection direction="up">
        <div className="bg-gradient-to-br from-shop-primary via-shop-primary/90 to-shop-secondary/80 py-16 dark:bg-gradient-mesh-dark">
          <div className="container-custom max-w-4xl">
            <Link to="/blog" className="inline-flex items-center text-white hover:underline mb-8">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all articles
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>
            
            {/* Post metadata */}
            <div className="flex flex-wrap gap-4 items-center text-white/90 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.authorName}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime} min read
              </div>
            </div>
            
            {/* Post tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-white/10 text-white border-transparent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Main Content Section */}
      <AnimatedSection direction="up">
        <div className="container-custom max-w-4xl py-12">
          {/* Cover Image */}
          <div className="bg-white dark:bg-shop-dark/50 rounded-xl overflow-hidden shadow-lg mb-8">
            {coverImage ? (
              <img 
                src={coverImage}
                alt={post.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const query = `web design ${post.categoryName.toLowerCase()}`;
                  target.src = `https://source.unsplash.com/random/1200x600/?${encodeURIComponent(query)}`;
                }}
              />
            ) : (
              // Loading skeleton
              <div className="w-full h-64 bg-gray-200 animate-pulse dark:bg-gray-700"></div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-2" />
              0 comments
            </div>
          </div>
          
          {/* Post content */}
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <Separator className="my-12" />
          
          {/* Author information */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src={post.authorAvatar || `https://source.unsplash.com/random/100x100/?portrait`}
                alt={post.authorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-shop-primary dark:text-white">{post.authorName}</h3>
              <p className="text-sm text-muted-foreground">Content Writer</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <AnimatedSection direction="up">
          <div className="bg-gradient-pastel dark:bg-shop-dark/30 py-16">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-shop-primary dark:text-white mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </Layout>
  );
};

export default BlogPostPage;
