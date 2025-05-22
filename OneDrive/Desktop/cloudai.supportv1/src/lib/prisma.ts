import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient | undefined;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export const prisma = global.prisma;

// Contact form submission function
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const contact = await prisma.contact.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    });
    return { success: true, contact };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
};

// Newsletter subscription function
export const subscribeToNewsletter = async (email: string) => {
  try {
    const subscriber = await prisma.newsletter.create({
      data: {
        email: email,
      },
    });
    return { success: true, subscriber };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error };
  }
}; 