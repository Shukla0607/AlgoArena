import React, { createContext, useContext, useState, ReactNode } from "react";
import { GoogleUser } from "../lib/googleAuth";

export type UserRole = "admin" | "general" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  picture?: string;
  provider?: "email" | "google" | "github";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  loginWithGoogle: (googleUser: GoogleUser, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isGeneral: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<boolean> => {
    // Mock authentication logic
    // In real app, this would make API calls to your backend

    // Demo admin credentials
    if (
      role === "admin" &&
      email === "admin@algoarena.com" &&
      password === "admin123"
    ) {
      setUser({
        id: "admin-1",
        name: "Admin User",
        email: "admin@algoarena.com",
        role: "admin",
        avatar: "A",
      });
      return true;
    }

    // Demo general user credentials
    if (
      role === "general" &&
      email === "user@algoarena.com" &&
      password === "user123"
    ) {
      setUser({
        id: "user-1",
        name: "John Doe",
        email: "user@algoarena.com",
        role: "general",
        avatar: "J",
      });
      return true;
    }

    // Allow any general user login for demo
    if (role === "general") {
      setUser({
        id: "user-demo",
        name: email.split("@")[0],
        email: email,
        role: "general",
        avatar: email.charAt(0).toUpperCase(),
      });
      return true;
    }

    return false;
  };

  const loginWithGoogle = async (
    googleUser: GoogleUser,
    role: UserRole,
  ): Promise<boolean> => {
    try {
      // In a real application, you would send the Google user data to your backend
      // to create or retrieve the user account

      const user: User = {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        role: role,
        avatar: googleUser.given_name.charAt(0),
        picture: googleUser.picture,
        provider: "google",
      };

      setUser(user);
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    logout,
    isAdmin: user?.role === "admin",
    isGeneral: user?.role === "general",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
