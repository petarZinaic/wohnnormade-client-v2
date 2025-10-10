export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
};

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};
