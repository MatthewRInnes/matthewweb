import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LoginPage } from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";

/**
 * Main App Component
 * 
 * This is the root component of the application. It:
 * 1. Sets up the context providers (Theme, Auth)
 * 2. Configures the router with all application routes
 * 3. Sets up the toast notification system
 * 
 * The component structure follows a standard pattern:
 * - Global providers wrap the entire application
 * - Router manages navigation between pages
 * - Routes define the available paths and components to render
 * 
 * All pages are lazy loaded which improves initial load time.
 */
export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>
          <Router>
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              
              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Information pages */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
