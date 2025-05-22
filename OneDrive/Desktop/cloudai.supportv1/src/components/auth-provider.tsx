// AuthProvider component for managing authentication state
import { useState } from "react";
import { signIn } from "next-auth/react";
import { User } from "@/lib/auth-types";
import { AuthContext } from "@/lib/auth-context";

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      setIsAuthenticated(true);
      // You might want to fetch user data here
      setUser({ email });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 