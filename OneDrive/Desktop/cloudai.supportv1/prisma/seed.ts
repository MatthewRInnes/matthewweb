import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import chalk from 'chalk';

const prisma = new PrismaClient();

// Helper function to log success messages
function logSuccess(message: string): void {
  console.log(chalk.green(`✓ ${message}`));
}

// Helper function to log error messages
function logError(error: unknown): void {
  console.error(chalk.red('✗ Error:'), error instanceof Error ? error.message : String(error));
}

async function main() {
  console.log(chalk.blue('🌱 Starting database seeding...'));

  try {
    // Create admin user
    console.log(chalk.yellow('Creating admin user...'));
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@cloudai.support',
		emailVerified: new Date(),
        role: 'ADMIN',
        profile: {
          create: {
            firstName: 'Admin',
            lastName: 'User',
            phone: '+1234567890'
          }
        }
      }
    });
    logSuccess('Admin user created successfully');

    // Create test user
    console.log(chalk.yellow('Creating test user...'));
    const testUser = await prisma.user.create({
      data: {
		name: 'Test User',
		email: 'test@cloudai.support',
        emailVerified: new Date(),
        role: 'USER',
        profile: {
          create: {
            firstName: 'Test',
            lastName: 'User',
            phone: '+1234567891'
          }
        }
      }
    });
    logSuccess('Test user created successfully');

    // Create categories
    console.log(chalk.yellow('Creating categories...'));
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'AI Services',
          slug: 'ai-services',
          description: 'Artificial Intelligence services and solutions'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Cloud Solutions',
          slug: 'cloud-solutions',
          description: 'Cloud computing and infrastructure services'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Support Plans',
          slug: 'support-plans',
          description: 'Technical support and maintenance plans'
        }
      })
    ]);
    logSuccess('Categories created successfully');

    // Create products
    console.log(chalk.yellow('Creating products...'));
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'AI Chatbot Service',
          slug: 'ai-chatbot-service',
          description: 'Advanced AI-powered chatbot solution for customer support',
          price: 99.99,
          stock: 100,
          images: ['/products/chatbot.jpg'],
          category: {
            connect: {
              id: categories[0].id
            }
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Cloud Hosting Basic',
          slug: 'cloud-hosting-basic',
          description: 'Basic cloud hosting package with essential features',
          price: 49.99,
          stock: 50,
          images: ['/products/hosting.jpg'],
          category: {
            connect: {
              id: categories[1].id
            }
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Premium Support Plan',
          slug: 'premium-support-plan',
          description: '24/7 premium technical support with guaranteed response time',
          price: 199.99,
          stock: 25,
          images: ['/products/support.jpg'],
          category: {
            connect: {
              id: categories[2].id
            }
          }
        }
      })
    ]);
    logSuccess('Products created successfully');

    // Create reviews
    console.log(chalk.yellow('Creating reviews...'));
    await Promise.all([
      prisma.review.create({
        data: {
          rating: 5,
          comment: 'Excellent service! The AI chatbot has significantly improved our customer support.',
          user: {
            connect: {
              id: testUser.id
            }
          },
          product: {
            connect: {
              id: products[0].id
            }
          }
        }
      }),
      prisma.review.create({
        data: {
          rating: 4,
          comment: 'Great cloud hosting solution. Very reliable and good performance.',
          user: {
            connect: {
              id: testUser.id
            }
          },
          product: {
            connect: {
              id: products[1].id
            }
          }
        }
      })
    ]);
    logSuccess('Reviews created successfully');

    // Create a cart for the test user
    console.log(chalk.yellow('Creating cart...'));
    await prisma.cart.create({
      data: {
        user: {
          connect: {
            id: testUser.id
          }
        },
        items: {
          create: [
            {
              quantity: 1,
              product: {
                connect: {
                  id: products[0].id
                }
              }
            }
          ]
        }
      }
    });
    logSuccess('Cart created successfully');

    console.log(chalk.green('Database has been seeded. 🌱'));
  } catch (error: unknown) {
    logError(error);
    throw error;
  }
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 