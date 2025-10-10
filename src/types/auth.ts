export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  createdAt: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  result?: {
    user: User;
    token: string;
  };
  data?: {
    user: User;
    token: string;
  };
  status?: boolean;
  error?: any;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  city: string;
  country: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    userData?: { name: string; surname: string; city: string; country: string }
  ) => Promise<void>;
  logout: () => void;
}
