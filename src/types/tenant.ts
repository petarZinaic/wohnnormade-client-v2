export interface TenantAuthor {
  id: number;
  email: string;
  name: string;
  surname: string;
}

export interface Tenant {
  id: number;
  name: string;
  surname: string;
  violationType: string;
  description: string;
  city: string;
  country: string;
  createdById: number;
  createdAt: string;
  updatedAt: string;
  createdBy: TenantAuthor;
}

export type CreateTenantData = Pick<
  Tenant,
  "name" | "surname" | "violationType" | "description" | "city" | "country"
>;

export interface ApiResponse<T> {
  result: T;
  status: boolean;
  error: any;
}
