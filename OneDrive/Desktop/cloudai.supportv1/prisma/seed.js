const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create test user
    console.log('Creating test user...');
    const hashedPassword = await hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER',
        profile: {
          create: {
            firstName: 'Test',
            lastName: 'User',
            phone: '+441234567890',
          },
        },
        addresses: {
          create: {
            street: '123 Test Street',
            city: 'London',
            postcode: 'SW1A 1AA',
            country: 'United Kingdom',
            isDefault: true,
          },
        },
      },
    });
    console.log('✅ Test user created successfully');

    // Create categories
    console.log('Creating categories...');
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Electronics',
          slug: 'electronics',
          description: 'Electronic devices and accessories',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Clothing',
          slug: 'clothing',
          description: 'Fashion and apparel',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Home & Garden',
          slug: 'home-garden',
          description: 'Home and garden products',
        },
      }),
    ]);
    console.log('✅ Categories created successfully');

    // Create products
    console.log('Creating products...');
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Smartphone X',
          slug: 'smartphone-x',
          description: 'Latest smartphone with advanced features',
          price: 699.99,
          stock: 100,
          images: ['/products/smartphone-1.jpg', '/products/smartphone-2.jpg'],
          categoryId: categories[0].id,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Laptop Pro',
          slug: 'laptop-pro',
          description: 'High-performance laptop for professionals',
          price: 1299.99,
          stock: 50,
          images: ['/products/laptop-1.jpg', '/products/laptop-2.jpg'],
          categoryId: categories[0].id,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Designer T-Shirt',
          slug: 'designer-tshirt',
          description: 'Premium quality cotton t-shirt',
          price: 49.99,
          stock: 200,
          images: ['/products/tshirt-1.jpg', '/products/tshirt-2.jpg'],
          categoryId: categories[1].id,
        },
      }),
    ]);
    console.log('✅ Products created successfully');

    // Create reviews
    console.log('Creating reviews...');
    await Promise.all([
      prisma.review.create({
        data: {
          rating: 5,
          comment: 'Excellent product!',
          userId: user.id,
          productId: products[0].id,
        },
      }),
      prisma.review.create({
        data: {
          rating: 4,
          comment: 'Very good, but a bit expensive',
          userId: user.id,
          productId: products[1].id,
        },
      }),
    ]);
    console.log('✅ Reviews created successfully');

    // Create cart
    console.log('Creating cart...');
    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 1,
            },
            {
              productId: products[2].id,
              quantity: 2,
            },
          ],
        },
      },
    });
    console.log('✅ Cart created successfully');

    // Create order
    console.log('Creating order...');
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'COMPLETED',
        total: 799.97,
        addressId: user.addresses[0].id,
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 1,
              price: products[0].price,
            },
          ],
        },
      },
    });
    console.log('✅ Order created successfully');

    console.log('✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Failed to seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 