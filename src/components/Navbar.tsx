import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { Link } from 'react-router-dom';

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
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 lg:py-4', 
        isScrolled 
          ? 'bg-background/90 dark:bg-navy/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Left side: Mobile Menu Button (always hamburger) */}
        <div className="lg:hidden z-50">
          <button 
            className="text-foreground dark:text-lightSlate menu-button focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center justify-center flex-1">
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
        
        {/* Right side: Logo & Theme Toggle */}
        <div className="flex items-center gap-4 ml-auto z-10">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-secondary hover:bg-accent/20 dark:bg-navy/80 dark:hover:bg-teal/20 transition-colors duration-300 shadow-md"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={24} className="text-teal" />
            ) : (
              <Moon size={24} className="text-navy" />
            )}
          </button>

          {/* Logo - Right side */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground dark:text-lightestSlate relative group"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {!imageError ? (
              <img 
                src="/assets/images/logo.png"
                alt="Matthew Innes Logo" 
                className="h-40 w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-40 w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">Logo</span>
              </div>
            )}
          </Link>
        </div>
      </nav>
      {/* Mobile Menu Overlay and Backdrop */}
      {isMenuOpen && (
        <>
          {/* Backdrop for outside click */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Overlay */}
          <div
            className={cn(
              "fixed left-0 right-0 top-20 bg-background z-50 flex flex-col justify-center items-center transition-all duration-300 ease-in-out py-8",
              "translate-x-0 opacity-100"
            )}
          >
            {/* Close button inside overlay, top right */}
            <button
              className="absolute top-6 right-6 text-foreground dark:text-lightSlate text-3xl focus:outline-none z-50"
              onClick={toggleMenu}
              aria-label="Close menu"
              type="button"
            >
              <X size={32} />
            </button>
            <div className="w-full flex justify-center">
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
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
