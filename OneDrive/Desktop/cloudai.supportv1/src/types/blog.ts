
// Type definitions for blog content

export interface BlogPost {
  id: string;
  title: string;
  slug: string; 
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  coverImage: string;
  categoryId: string;
  categoryName: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// These types prepare for Supabase integration
export interface SupabaseBlogPost extends Omit<BlogPost, 'authorName' | 'categoryName' | 'tags'> {
  author: BlogAuthor;
  category: BlogCategory;
  blog_tags?: { tag: { name: string } }[];
}
