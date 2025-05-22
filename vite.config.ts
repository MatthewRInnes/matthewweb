/**
 * Vite Configuration
 * 
 * This file configures the Vite development server and build settings.
 * It includes server configuration, plugins, and path aliases.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Development server configuration
  server: {
    // Allow connections from any IP address
    host: "::",
    // Set the development server port
    port: 8080,
  },
  // Enable React plugin for JSX support
  plugins: [react()],
  // Configure module resolution
  resolve: {
    // Set up path aliases for cleaner imports
    alias: {
      // Map '@' to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
