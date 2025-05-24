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
  // Base URL for production
  base: '/',
  // Development server configuration
  server: {
    // Allow connections from any IP address
    host: true,
    // Set the development server port
    port: 8080,
    // Enable CORS
    cors: true,
    // Add security headers
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Content-Type': 'application/javascript',
    },
    // Enable HMR (Hot Module Replacement)
    hmr: {
      overlay: true,
    },
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
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Enable proper source maps
    sourcemap: true,
    minify: 'terser',
    // Ensure proper chunking and loading
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Ensure proper chunk size
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
