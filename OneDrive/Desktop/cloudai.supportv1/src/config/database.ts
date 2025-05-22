import { PrismaClient } from '@prisma/client';
import { env } from '../utils/env';

// Create a new Prisma client instance
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Database configuration
export const databaseConfig = {
  url: env.VITE_DATABASE_URL,
  ssl: env.VITE_DATABASE_SSL,
  // Add any additional ORM-specific configuration here
  // For example, if using Prisma:
  // prisma: {
  //   log: ['query', 'info', 'warn', 'error'],
  // },
};

// Export database connection function
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Export database disconnection function
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
    process.exit(1);
  }
}

// Export Prisma client
export { prisma }; 