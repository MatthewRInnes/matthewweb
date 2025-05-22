import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
    } & DefaultSession["user"]
  }
}

/**
 * NextAuth configuration options
 * 
 * This configuration sets up authentication with:
 * - Google OAuth
 * - Apple Sign In
 * - Prisma adapter for database storage
 */
export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
	pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
}; 