import { RequestOptions, HTTPError } from './types';

export class HTTPClient {
  private baseURL: string;
  private defaultOptions: RequestInit;

  constructor(baseURL: string = '', defaultOptions: RequestInit = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = defaultOptions;
  }

  private buildURL(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseURL || window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return url.toString();
  }

  private async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout = 30000, params, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        this.buildURL(url, params),
        {
          ...this.defaultOptions,
          ...fetchOptions,
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        ) as HTTPError;
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });
  }
}
