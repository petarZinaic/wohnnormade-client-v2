import { getApiUrl } from "@/utils/api";
import { AuthService } from "./auth";

export interface UpdateUserData {
  name?: string;
  surname?: string;
  city?: string;
  country?: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  createdAt: string;
}

class UserService {
  /**
   * Update user profile data
   * @param userId - User ID
   * @param userData - Data to update
   * @returns Promise<UserProfile> - Updated user profile
   */
  static async updateProfile(
    userId: number,
    userData: UpdateUserData
  ): Promise<UserProfile> {
    try {
      const response = await fetch(getApiUrl(`users/${userId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...AuthService.getAuthHeaders(),
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to update profile");
      }

      const result = await response.json();
      return result.user || result;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  }

  /**
   * Get user profile by ID
   * @param userId - User ID
   * @returns Promise<UserProfile> - User profile data
   */
  static async getUserProfile(userId: number): Promise<UserProfile> {
    try {
      const response = await fetch(getApiUrl(`users/${userId}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to fetch user profile");
      }

      const result = await response.json();
      return result.user || result;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch user profile"
      );
    }
  }

  /**
   * Delete user account
   * @param userId - User ID
   * @returns Promise<void>
   */
  static async deleteAccount(userId: number): Promise<void> {
    try {
      const response = await fetch(getApiUrl(`users/${userId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...AuthService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete account"
      );
    }
  }
}

export default UserService;
