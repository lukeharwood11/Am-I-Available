import axiosInstance from '../../lib/axios';
import { HTTP_METHODS, CONTENT_TYPES } from '../constants';

interface RequestConfig {
  method?: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  accessToken?: string;
}

class ApiHub {
  private async makeRequest<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      method = HTTP_METHODS.GET,
      data,
      params,
      headers = {},
      accessToken,
    } = config;

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': CONTENT_TYPES.JSON,
      ...headers,
    };

    // Add authorization header if access token is provided
    if (accessToken) {
      requestHeaders.Authorization = `Bearer ${accessToken}`;
    }

    try {
      const response = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: requestHeaders,
      });

      return response.data;
    } catch (error: any) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        throw new Error(
          error.response.data?.message || `HTTP Error: ${error.response.status}`
        );
      } else if (error.request) {
        // Network error
        throw new Error('Network error. Please check your connection.');
      } else {
        // Other error
        throw new Error(error.message || 'An unexpected error occurred.');
      }
    }
  }

  // Generic CRUD operations
  async get<T>(
    url: string,
    config?: Omit<RequestConfig, 'method' | 'data'>
  ): Promise<T> {
    return this.makeRequest<T>(url, { ...config, method: HTTP_METHODS.GET });
  }

  async post<T>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> {
    return this.makeRequest<T>(url, {
      ...config,
      data,
      method: HTTP_METHODS.POST,
    });
  }

  async put<T>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> {
    return this.makeRequest<T>(url, {
      ...config,
      data,
      method: HTTP_METHODS.PUT,
    });
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> {
    return this.makeRequest<T>(url, {
      ...config,
      data,
      method: HTTP_METHODS.PATCH,
    });
  }

  async delete<T>(
    url: string,
    config?: Omit<RequestConfig, 'method' | 'data'>
  ): Promise<T> {
    return this.makeRequest<T>(url, { ...config, method: HTTP_METHODS.DELETE });
  }
}

export const apiHub = new ApiHub();
