import { getApiUrl } from "@/utils/api";
import type { ApiResponse, CreateTenantData, Tenant } from "@/types/tenant";
import { AuthService } from "./auth";

class TenantService {
  static async getTenants(): Promise<ApiResponse<Tenant[]>> {
    const response = await fetch(getApiUrl("/contribute/tenants"), {
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
    });
    return response.json();
  }

  static async getTenantById(id: number): Promise<ApiResponse<Tenant>> {
    const response = await fetch(getApiUrl(`/contribute/tenants/${id}`), {
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
    const response = await fetch(getApiUrl("/contribute/create-tennant"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default TenantService;
