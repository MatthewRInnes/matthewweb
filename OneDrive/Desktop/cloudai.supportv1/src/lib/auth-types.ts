// Auth context types
export type User = {
  email: string;
  name?: string;
  image?: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}; 