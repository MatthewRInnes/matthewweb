import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

const navItems = [
  { name: 'Home', href: '#top' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Premium Ads', href: '#advertising' },
  { name: 'Classified Ads', href: '#classified-ads' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update currentPath when location changes
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [window.location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Clean up on unmount
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  // Simple toggle function
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // Container to align navbar with main content
    <nav className="w-full bg-background/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-border dark:border-slate/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-28"> {/* Always has horizontal padding for mobile and desktop alignment */}
        {/* Left: Hamburger menu on mobile, nav links on desktop */}
        <div className="flex items-center xl:hidden">
          <button 
            className="text-foreground dark:text-lightSlate menu-button focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            <Menu size={24} />
          </button>
        </div>
        <div className="hidden xl:flex items-center">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href}
                  className="text-foreground dark:text-lightSlate hover:text-gradient-teal dark:hover:text-gradient-teal transition-colors duration-700 relative group flex items-center"
                >
                  {item.name === 'Home' && <Home size={16} className="mr-2" />}
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-teal transform scale-x-0 origin-bottom transition-transform duration-700 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Theme toggle and logo */}
        <div className="flex items-center gap-4 ml-auto relative"> {/* Added relative positioning */}
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground dark:text-lightestSlate relative group mt-2 xl:mt-0"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {!imageError ? (
              <img 
                src="/assets/images/logo.png"
                alt="Matthew Innes Logo" 
                className="h-32 w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48 hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-32 w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">Logo</span>
              </div>
            )}
          </Link>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-secondary hover:bg-accent/20 dark:bg-navy/80 dark:hover:bg-teal/20 transition-colors duration-300 shadow-md absolute right-[calc(100%+5px)] top-1/2 -translate-y-1/2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-teal" />
            ) : (
              <Moon size={20} className="text-navy" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay and Backdrop using React Portal */}
      {isMenuOpen && ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)} // Close menu on any click outside the actual menu
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* Overlay - click inside won't close menu */}
          <div
            className="absolute left-0 right-0 top-32 bg-background py-8 z-50"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={e => e.stopPropagation()} // Prevent menu itself from triggering close
          >
            <button
              className="absolute top-6 right-6 text-foreground dark:text-lightSlate text-3xl focus:outline-none z-50"
              onClick={toggleMenu}
              aria-label="Close menu"
              type="button"
            >
              <X size={32} />
            </button>
            <ul className="space-y-8 text-center">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-foreground dark:text-lightSlate hover:text-gradient-teal dark:hover:text-gradient-teal text-2xl transition-colors duration-700 relative group flex items-center justify-center"
                    onClick={toggleMenu}
                  >
                    {item.name === 'Home' && <Home size={18} className="mr-2" />}
                    {item.name}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-teal transform scale-x-0 origin-bottom transition-transform duration-700 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
