
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, ChevronRight, CreditCard, 
  ShieldCheck, ArrowRight, Lock
} from "lucide-react";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

/**
 * CheckoutPage Component
 * 
 * Provides a complete checkout experience with shipping and payment forms.
 * 
 * Features:
 * - Contact information entry
 * - Shipping address form
 * - Payment information collection
 * - Order summary with product details
 * - Interactive breadcrumb navigation
 * - Form validation with error notifications
 * - Order placement with success confirmation
 * - Sticky order summary on desktop
 * - Empty cart redirect to products
 */
const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Form state for all checkout fields
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });
  
  // Loading state for form submission
  const [loading, setLoading] = useState(false);
  
  // Calculate summary values for order total
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const taxes = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + taxes;
  
  /**
   * Handles input field changes and updates form state
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  /**
   * Handles select dropdown changes and updates form state
   * @param {string} name - Field name to update
   * @param {string} value - New value for the field
   */
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  /**
   * Form submission handler
   * Validates form, simulates payment processing, and navigates to confirmation
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation - check for empty fields
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === "") {
        toast.error(`Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()} field`);
        return;
      }
    }
    
    // Simulate payment processing with loading state
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - clear cart and navigate to confirmation
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-confirmation");
    } catch (error) {
      toast.error("There was a problem processing your payment");
    } finally {
      setLoading(false);
    }
  };
  
  // Redirect to products if cart is empty
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold mb-6 text-shop-primary">Checkout</h1>
          <p className="mb-6">Your cart is empty. Add some products before checkout.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-2 text-shop-primary">Checkout</h1>
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link to="/cart" className="hover:underline">Cart</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-shop-primary">Checkout</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-muted-foreground">Confirmation</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="bg-shop-secondary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {!isAuthenticated && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Already have an account?</span>{" "}
                      <Link to="/login" className="text-shop-secondary hover:underline">Log in</Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="bg-shop-secondary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={formData.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="bg-shop-secondary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                  Payment Information
                </h2>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-shop-secondary" />
                    <span>Credit Card</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-1 text-shop-secondary" />
                    <span className="text-sm text-muted-foreground">Secure Payment</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Expiry Date (MM/YY)</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvc">CVC/CVV</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-start">
                  <ShieldCheck className="h-5 w-5 mr-2 text-shop-secondary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Your payment information is secured with SSL encryption.
                    We do not store your credit card details.
                  </p>
                </div>
              </div>
              
              <div className="lg:hidden">
                <OrderSummary 
                  items={cartItems} 
                  subtotal={subtotal} 
                  shipping={shipping} 
                  taxes={taxes} 
                  total={total} 
                  loading={loading} 
                />
              </div>
            </form>
          </div>
          
          {/* Order Summary - sticky on desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <OrderSummary 
                items={cartItems} 
                subtotal={subtotal} 
                shipping={shipping} 
                taxes={taxes} 
                total={total} 
                loading={loading} 
                onPlaceOrder={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/**
 * OrderSummary Component
 * 
 * Displays an order summary with item details and price breakdown.
 * 
 * @param {object} props - Component props
 * @param {array} props.items - Cart items to display
 * @param {number} props.subtotal - Order subtotal
 * @param {number} props.shipping - Shipping cost
 * @param {number} props.taxes - Tax amount
 * @param {number} props.total - Order total
 * @param {boolean} props.loading - Loading state for order button
 * @param {function} props.onPlaceOrder - Handler for place order button
 */
const OrderSummary = ({ 
  items, 
  subtotal, 
  shipping, 
  taxes, 
  total, 
  loading, 
  onPlaceOrder 
}: any) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
      
      {/* Items summary with scrollable area */}
      <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
        {items.map((item: any) => (
          <div key={item.product.id} className="flex justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-shop-light rounded-md overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src={process.env.NODE_ENV === 'production' ? item.product.image : '/images/placeholder.svg'} 
                  alt={item.product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">£{(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      {/* Price breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>£{taxes.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between pt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold">£{total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Place order button with loading state */}
      <Button 
        className="w-full bg-shop-secondary hover:bg-shop-secondary/90"
        size="lg"
        disabled={loading}
        onClick={onPlaceOrder}
        type="submit"
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            Place Order
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
      
      {/* Secure payment note */}
      <div className="mt-4 flex items-center justify-center text-xs text-muted-foreground">
        <Lock className="h-3 w-3 mr-1" />
        Secure Payment
      </div>
    </div>
  );
};

export default CheckoutPage;
