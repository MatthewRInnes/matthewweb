
import { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CheckCircle, ShoppingBag } from "lucide-react";

const OrderConfirmationPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // If someone navigates directly to this page without placing an order, redirect them
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  }, [cartItems, navigate]);
  
  // Generate an order number
  const orderNumber = "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-shop-primary mb-4">Order Confirmed!</h1>
            
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            <div className="bg-shop-light rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-semibold">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-semibold">Credit Card</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-semibold">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <p className="mb-8 text-muted-foreground">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-shop-secondary hover:bg-shop-secondary/90"
                size="lg"
                asChild
              >
                <Link to="/account/orders">
                  View Order
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link to="/">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
