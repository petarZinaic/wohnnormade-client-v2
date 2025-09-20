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
    // On app start, if token exists, fetch the latest user profile from API
    const initialize = async () => {
      try {
        const token = AuthService.getToken();
        if (!token) {
          setIsLoading(false);
          return;
        }
        const cached = AuthService.getUser();
        // Try to use cached id if present; otherwise, fall back to API-derived user in cookies
        const userId = (cached as any)?.id;
        if (userId) {
          const fresh = await fetch(`/api-proxy/users/${userId}`);
          // Fallback to direct API util if proxy route is not used
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });
    console.log("AuthContext login response:", response);

    // Extract user from the response structure
    const user = response.user || response.result?.user || response.data?.user;
    console.log("AuthContext extracted user:", user);

    if (user?.id) {
      try {
        const freshUser = await fetch(`/api-proxy/users/${user.id}`);
        // If no proxy exists, keep cookie user; otherwise this could be expanded later
      } catch {
        // ignore
      }
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
