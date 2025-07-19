"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthService } from "@/services/auth";
import type { User, AuthContextType } from "@/types";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const currentUser = AuthService.getUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });
    console.log("AuthContext login response:", response);

    // Extract user from the response structure
    const user = response.user || response.result?.user || response.data?.user;
    console.log("AuthContext extracted user:", user);

    if (user) {
      setUser(user);
    } else {
      console.error("No user found in login response");
    }
  };

  const register = async (
    email: string,
    password: string,
    userData?: { name: string; surname: string; city: string; country: string }
  ) => {
    if (!userData) {
      throw new Error("User data is required for registration");
    }

    const registerData = {
      email,
      password,
      name: userData.name,
      surname: userData.surname,
      city: userData.city,
      country: userData.country,
    };

    const response = await AuthService.register(registerData);
    console.log("AuthContext register response:", response);

    // Extract user from the response structure
    const user = response.user || response.result?.user || response.data?.user;
    console.log("AuthContext extracted user:", user);

    if (user) {
      setUser(user);
    } else {
      console.error("No user found in register response");
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
