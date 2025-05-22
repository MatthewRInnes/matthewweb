import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, Trash2, Plus, Minus, 
  ArrowRight, ShoppingBag, AlertTriangle 
} from "lucide-react";
import { toast } from "sonner";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  
  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Promo code functionality will be available soon!");
    setPromoCode("");
  };
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  // Calculate summary values
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const taxes = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + taxes;

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6 text-shop-primary">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-shop-light rounded-full mb-4">
              <ShoppingCart className="h-8 w-8 text-shop-secondary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button className="bg-shop-secondary hover:bg-shop-secondary/90" asChild>
              <Link to="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <h2 className="font-semibold text-lg">
                      Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearCart}
                      className="text-shop-secondary hover:text-shop-secondary"
                    >
                      Clear all
                    </Button>
                  </div>
                  
                  {/* Items list */}
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id}>
                        <div className="flex flex-col sm:flex-row">
                          {/* Product image */}
                          <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-shop-light rounded-md overflow-hidden mb-4 sm:mb-0">
                            <img 
                              src={process.env.NODE_ENV === 'production' ? item.product.image : '/images/placeholder.svg'} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product details */}
                          <div className="sm:ml-6 flex-1">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <h3 className="text-shop-primary">
                                  <Link to={`/product/${item.product.id}`} className="font-medium hover:text-shop-secondary">
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                  {item.product.category}
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0 text-right">
                                <p className="font-bold text-shop-primary">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  ${item.product.price.toFixed(2)} each
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity controls */}
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                                  className="w-16 text-center border rounded"
                                  aria-label={`Quantity for ${item.product.name}`}
                                  title={`Update quantity for ${item.product.name}`}
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              {/* Remove button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-6" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6 flex">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
                
                {/* Promo code */}
                <form onSubmit={handleApplyPromoCode} className="mb-6">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" variant="outline">
                      Apply
                    </Button>
                  </div>
                </form>
                
                <Separator className="mb-6" />
                
                {/* Price breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Checkout button */}
                <Button 
                  className="w-full bg-shop-secondary hover:bg-shop-secondary/90"
                  size="lg"
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                {/* Info note */}
                <div className="mt-6 p-4 bg-shop-light rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-shop-secondary flex-shrink-0 mr-3" />
                  <p className="text-sm text-muted-foreground">
                    Shipping and taxes will be calculated at checkout based on your location.
                    Free shipping on all orders over $50.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
