import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        // Get token from localStorage or other storage
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          // Handle specific error cases
          switch (error.response.status) {
            case 401:
              // Handle unauthorized
              if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }
              break;
            case 403:
              // Handle forbidden
              break;
            case 404:
              // Handle not found
              break;
            case 422:
              // Handle validation errors
              break;
            case 500:
              // Handle server error
              break;
            default:
              // Handle other errors
              break;
          }

          return Promise.reject({
            message: error.response.data.message || "An error occurred",
            status: error.response.status,
            data: error.response.data,
          });
        }

        if (error.request) {
          // Handle network errors
          return Promise.reject({
            message: "Network error occurred",
            status: 0,
          });
        }

        // Handle other errors
        return Promise.reject({
          message: error.message || "An error occurred",
          status: 0,
        });
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get<T, T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<T, T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put<T, T>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch<T, T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<T, T>(url, config);
  }

  setAuthToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  clearAuthToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }
}

const api = new APIClient();
export default api;
