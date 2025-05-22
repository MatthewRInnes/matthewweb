
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Landing Page Template',
    description: 'A sleek, responsive landing page template with modern design elements. Perfect for startups, small businesses, or personal portfolios.',
    price: 59.99,
    category: 'Website Templates',
    image: '/images/desk-lamp.jpg',
    featured: true,
    inStock: true,
    rating: 4.8,
    reviews: 125
  },
  {
    id: '2',
    name: 'Premium Logo Design Package',
    description: 'Professional logo design with multiple concepts, unlimited revisions, and all file formats included for your brand identity.',
    price: 249.99,
    category: 'Logo Graphics',
    image: '/images/headphones.jpg',
    featured: true,
    inStock: true,
    rating: 4.7,
    reviews: 348
  },
  {
    id: '3',
    name: 'Custom T-Shirt Design',
    description: 'Eye-catching t-shirt design templates with customizable text and graphics. Perfect for events, businesses, or personal use.',
    price: 29.99,
    category: 'Apparel Graphics',
    image: '/images/tshirt.jpg',
    featured: false,
    inStock: true,
    rating: 4.5,
    reviews: 230
  },
  {
    id: '4',
    name: 'Business Card Template Pack',
    description: 'Set of professional business card templates with modern designs. Easily customizable in Photoshop or Illustrator.',
    price: 34.99,
    category: 'Print Graphics',
    image: '/images/water-bottle.jpg',
    featured: false,
    inStock: true,
    rating: 4.9,
    reviews: 189
  },
  {
    id: '5',
    name: 'E-commerce Website Template',
    description: 'Complete e-commerce website template with product pages, shopping cart, and checkout functionality. Mobile-responsive and SEO-friendly.',
    price: 179.99,
    category: 'Website Templates',
    image: '/images/fitness-watch.jpg',
    featured: true,
    inStock: true,
    rating: 4.6,
    reviews: 276
  },
  {
    id: '6',
    name: 'Social Media Graphics Pack',
    description: 'Set of 20 customizable social media templates for Instagram, Facebook, and Twitter. Boost your online presence with professional designs.',
    price: 49.99,
    category: 'Social Media Graphics',
    image: '/images/plant-pots.jpg',
    featured: false,
    inStock: true,
    rating: 4.7,
    reviews: 115
  },
  {
    id: '7',
    name: 'Custom Mug Design Templates',
    description: 'Creative mug design templates perfect for merchandising, gifts, or promotional items. Easy to customize with your own text and graphics.',
    price: 19.99,
    category: 'Merchandise Graphics',
    image: '/images/messenger-bag.jpg',
    featured: false,
    inStock: false,
    rating: 4.8,
    reviews: 92
  },
  {
    id: '8',
    name: 'Portfolio Website Template',
    description: 'Elegant portfolio website template designed for creatives, photographers, and designers to showcase their work beautifully.',
    price: 89.99,
    category: 'Website Templates',
    image: '/images/bluetooth-speaker.jpg',
    featured: true,
    inStock: true,
    rating: 4.5,
    reviews: 210
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Add the missing function that ProductsPage is trying to import
export const getAllAdverts = (): Product[] => {
  return products;
};

