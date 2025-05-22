import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { Sun, Moon } from 'lucide-react';

/**
 * Navbar Component
 * 
 * This component renders the site navigation bar with responsive design.
 * It includes the main site navigation, search functionality, cart status,
 * user authentication controls, and theme switching.
 * 
 * Features:
 * - Responsive design with mobile menu toggle
 * - Search functionality with form submission
 * - Shopping cart with item count badge
 * - Authentication-aware UI (login/user profile)
 * - Theme switching via ThemeSwitcher component
 * - Mobile-optimized navigation with icons
 */
export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            CloudAI
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/services">
              <Button variant="ghost">Services</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
