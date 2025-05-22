// Environment variable validation utility
import { z } from 'zod';

// Define the schema for our environment variables
const envSchema = z.object({
  // API Configuration
  VITE_API_URL: z.string().url(),
  VITE_API_VERSION: z.string().regex(/^v\d+$/),

  // Authentication
  VITE_AUTH_TOKEN_KEY: z.string().min(1),
  VITE_REFRESH_TOKEN_KEY: z.string().min(1),
  VITE_TOKEN_EXPIRY: z.string().transform(Number).refine((n) => n > 0),

  // Database Configuration
  VITE_DATABASE_URL: z.string().min(1),
  VITE_DATABASE_SSL: z.string().transform((val) => val === 'true'),

  // Google OAuth
  VITE_GOOGLE_CLIENT_ID: z.string().min(1),
  VITE_GOOGLE_CLIENT_SECRET: z.string().min(1),



  // Analytics
  VITE_ANALYTICS_ID: z.string().min(1),

  // Feature Flags
  VITE_ENABLE_BIOMETRICS: z.string().transform((val) => val === 'true'),
  VITE_ENABLE_PUSH_NOTIFICATIONS: z.string().transform((val) => val === 'true'),
  VITE_ENABLE_SOCIAL_LOGIN: z.string().transform((val) => val === 'true'),

  // Cache Configuration
  VITE_CACHE_TTL: z.string().transform(Number).refine((n) => n > 0),
  VITE_CACHE_MAX_SIZE: z.string().transform(Number).refine((n) => n > 0),

  // Error Reporting
  VITE_ERROR_REPORTING_ENABLED: z.string().transform((val) => val === 'true'),
  VITE_ERROR_REPORTING_URL: z.string().url(),

  // Performance Monitoring
  VITE_PERFORMANCE_MONITORING_ENABLED: z.string().transform((val) => val === 'true'),
  VITE_PERFORMANCE_SAMPLE_RATE: z.string().transform(Number).refine((n) => n >= 0 && n <= 1),
});

// Type for our validated environment variables
export type Env = z.infer<typeof envSchema>;

// Function to validate environment variables
export function validateEnv(): Env {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.errors);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

// Function to get environment variables with type safety
export function getEnv(): Env {
  try {
    return validateEnv();
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    process.exit(1);
  }
}

// Function to check if we're in development mode
export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}

// Function to check if we're in production mode
export function isProduction(): boolean {
  return import.meta.env.MODE === 'production';
}

// Function to get the current environment name
export function getEnvironment(): string {
  return import.meta.env.MODE;
}

// Export validated environment variables
export const env = getEnv(); 