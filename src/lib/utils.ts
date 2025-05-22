// Utility functions for class name management and styling
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines multiple class names and merges Tailwind CSS classes efficiently
// Handles conditional classes and resolves conflicts between Tailwind utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
