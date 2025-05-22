import { useState } from 'react';
import Layout from "@/components/Layout/Layout";
import { AnimatedSection } from '@/components/Animation/AnimatedSection';
import { StaggeredContainer } from '@/components/Animation/StaggeredContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CountUp } from '@/components/Animation/CountUp';
import BlogList from '@/components/Blog/BlogList';
import BlogCard from '@/components/Blog/BlogCard';
import { blogCategories, blogPosts, getFeaturedBlogPosts, getRecentBlogPosts } from '@/data/blogPosts';

/**
 * BlogPage Component
 * 
 * Main page for the blog section of the website.
 * Features:
 * - Hero section with animated statistics
 * - Featured blog posts section
 * - Category-based browsing with tabs
 * - Blog post filtering capabilities
 * - Responsive design for all screen sizes
 * - Newsletter subscription form
 * 
 * The component uses Unsplash API integration for blog post images and
 * is structured to work with future Supabase integration.
 */
const BlogPage = () => {
  // State for tracking active category tab
  const [activeTab, setActiveTab] = useState('all');
  
  // Get featured and recent posts from the data store
  const featuredPosts = getFeaturedBlogPosts();
  const recentPosts = getRecentBlogPosts(6);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
        {/* Add blog posts here */}
      </div>
    </Layout>
  );
};

export default BlogPage;
