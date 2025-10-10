import type { User, AuthResponse, LoginData, RegisterData } from "@/types/auth";
import { getApiUrl } from "@/utils/api";

class AuthService {
  private static readonly TOKEN_KEY = "auth_token";
  private static readonly USER_KEY = "auth_user";

  static async login(data: LoginData): Promise<AuthResponse> {
    console.log("Attempting login with:", data);

    const response = await fetch(getApiUrl("auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Login error:", error);
      throw new Error(error.error?.message || "Login failed");
    }

    const result = await response.json();
    console.log("Login result:", result);

    this.setAuthData(result);
    return result;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    console.log("Attempting registration with:", data);

    const response = await fetch(getApiUrl("auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Registration response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Registration error:", error);
      throw new Error(error.error?.message || "Registration failed");
    }

    const result = await response.json();
    console.log("Registration result:", result);

    this.setAuthData(result);
    return result;
  }

  static logout(): void {
    this.deleteCookie(this.TOKEN_KEY);
    this.deleteCookie(this.USER_KEY);
  }

  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return this.getCookie(this.TOKEN_KEY);
  }

  static getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = this.getCookie(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  private static setAuthData(authResponse: any): void {
    console.log("Auth response received:", authResponse);

    // Handle different possible response structures
    const token =
      authResponse.token ||
      authResponse.accessToken ||
      authResponse.access_token ||
      authResponse.result?.token ||
      authResponse.result?.accessToken ||
      authResponse.data?.token;

    const user =
      authResponse.user ||
      authResponse.userData ||
      authResponse.data?.user ||
      authResponse.result?.user ||
      authResponse.result?.userData;

    console.log("Extracted token:", token);
    console.log("Extracted user:", user);

    if (!token) {
      console.error("No token found in response:", authResponse);
      throw new Error("No token received from server");
    }

    if (!user) {
      console.error("No user data found in response:", authResponse);
      throw new Error("No user data received from server");
    }

    // Set cookie with 7 days expiration
    this.setCookie(this.TOKEN_KEY, token, 7);
    this.setCookie(this.USER_KEY, JSON.stringify(user), 7);

    console.log("Token and user data stored in cookies");
  }

  private static setCookie(name: string, value: string, days: number): void {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  private static getCookie(name: string): string | null {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private static deleteCookie(name: string): void {
    if (typeof window === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export { AuthService };
