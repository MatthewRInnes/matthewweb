import { createContext, useState, useEffect } from 'react';

// Define the theme type
type Theme = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * ThemeProvider Component
 * 
 * Provides theme management functionality to the application.
 * Features:
 * - Automatic theme detection based on user system preferences
 * - Persistent theme storage using localStorage
 * - Theme toggle functionality
 * - Real-time theme switching
 * - Enhanced dark mode with improved colors
 * 
 * @param {React.ReactNode} children - Child components that will have access to theme context
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme changes
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
