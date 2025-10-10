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

  static async searchTenants(query: string): Promise<ApiResponse<Tenant[]>> {
    const normalized = query.replace(/\s+/g, " ").trim();
    const url = getApiUrl(`/tenant/search?q=${encodeURIComponent(normalized)}`);
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

  static async updateTenant(
    id: number,
    data: Partial<CreateTenantData>
  ): Promise<ApiResponse<Tenant>> {
    const response = await fetch(getApiUrl(`/tenant/${id}`), {
      method: "PUT",
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
        "Failed to update tenant";
      throw new Error(message);
    }
    return response.json();
  }

  static async deleteTenant(
    id: number
  ): Promise<{ status: boolean } | ApiResponse<{}>> {
    const response = await fetch(getApiUrl(`/tenant/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
    });
    if (!response.ok) {
      let errorBody: any = {};
      try {
        errorBody = await response.json();
      } catch {}
      const message =
        errorBody?.error?.message ||
        errorBody?.message ||
        "Failed to delete tenant";
      throw new Error(message);
    }
    try {
      return await response.json();
    } catch {
      return { status: true } as any;
    }
  }
}

export default TenantService;
