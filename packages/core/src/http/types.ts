export interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string>;
}

export interface HTTPError extends Error {
  status: number;
  statusText: string;
}
