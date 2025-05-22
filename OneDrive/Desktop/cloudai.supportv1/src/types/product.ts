
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
