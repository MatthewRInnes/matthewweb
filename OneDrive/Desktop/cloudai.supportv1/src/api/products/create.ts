import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * API endpoint for creating a new product
 * 
 * This endpoint:
 * 1. Creates a product in Stripe
 * 2. Creates a price for the product in Stripe
 * 3. Stores the product in our database
 */
export async function POST(request: Request) {
  try {
    const { name, description, amount, images, currency } = await request.json();

    // Validate required fields
    if (!name || !amount) {
      return NextResponse.json(
        { error: 'Name and amount are required' },
        { status: 400 }
      );
    }

    // Store product in our database
    const dbProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: amount / 100, // Convert from pence to pounds
        images,
        slug: name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
        stock: 0, // Default stock
        category: {
          connect: {
            id: "default-category" // You'll need to create a default category first
          }
        },
        image: images[0], // Assuming the first image is the main image
        rating: 0, // Assuming a default rating
        reviews: {
          create: [] // Create an empty array of reviews
        }
      },
    });

    return NextResponse.json({
      product: dbProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 