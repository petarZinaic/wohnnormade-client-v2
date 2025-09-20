import { getApiUrl } from "@/utils/api";
import type { ApiResponse, CreateTenantData, Tenant } from "@/types/tenant";
import { AuthService } from "./auth";

class TenantService {
  static async getTenants(): Promise<ApiResponse<Tenant[]>> {
    const response = await fetch(getApiUrl("/tenant"), {
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
    });
    return response.json();
  }

  static async getTenantById(id: number): Promise<ApiResponse<Tenant>> {
    const response = await fetch(getApiUrl(`/tenant/${id}`), {
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
    });
    return response.json();
  }

  static async searchTenantsByName(
    name: string
  ): Promise<ApiResponse<Tenant[]>> {
    const url = getApiUrl(`/tenant/search?name=${encodeURIComponent(name)}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
    });
    return response.json();
  }

  static async createTenant(
    data: CreateTenantData
  ): Promise<ApiResponse<Tenant>> {
    const response = await fetch(getApiUrl("/tenant/create"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorBody: any = {};
      try {
        errorBody = await response.json();
      } catch {}
      const message =
        errorBody?.error?.message ||
        errorBody?.message ||
        "Failed to create tenant";
      throw new Error(message);
    }
    return response.json();
  }
}

export default TenantService;
