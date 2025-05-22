import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth API route handler
 * 
 * This file sets up the authentication API endpoints for:
 * - Sign in
 * - Sign out
 * - Session management
 * - OAuth callbacks
 */
export default NextAuth(authOptions); 