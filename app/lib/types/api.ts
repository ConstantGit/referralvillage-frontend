export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ApiFilter {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

export interface ApiValidationError extends ApiError {
  errors: {
    [field: string]: string[];
  };
}

export interface ApiAuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

export interface ApiListResponse<T> extends PaginatedResponse<T> {
  filters?: {
    [key: string]: any;
  };
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface ApiUploadResponse {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
}

export interface ApiDeleteResponse {
  success: boolean;
  message: string;
  deletedId: string | number;
}

export interface ApiBulkActionResponse {
  success: boolean;
  message: string;
  affectedIds: (string | number)[];
  failedIds?: (string | number)[];
}

export interface ApiHealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  services?: {
    [service: string]: {
      status: 'up' | 'down';
      latency: number;
      lastChecked: string;
    };
  };
}

export interface ApiRateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

export interface ApiVersionInfo {
  version: string;
  buildNumber: string;
  environment: string;
  features: string[];
}

export interface ApiWebhookPayload<T = any> {
  event: string;
  timestamp: string;
  data: T;
  signature: string;
}

export interface ApiWebhookResponse {
  received: boolean;
  processingId: string;
}

export interface ApiSearchResult<T> {
  items: T[];
  total: number;
  took: number;
  facets?: {
    [key: string]: {
      [value: string]: number;
    };
  };
}

export interface ApiAggregationResult {
  [key: string]: {
    count: number;
    [metric: string]: number;
  };
}

export interface ApiCacheInfo {
  hit: boolean;
  age: number;
  expiresIn: number;
}

export interface ApiRequestOptions {
  timeout?: number;
  retry?: number;
  cache?: boolean;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export interface ApiErrorContext {
  url: string;
  method: string;
  timestamp: string;
  requestId: string;
  errorCode: string;
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiContentType =
  | 'application/json'
  | 'multipart/form-data'
  | 'application/x-www-form-urlencoded'
  | 'text/plain';

export type ApiResponseFormat = 'json' | 'blob' | 'text' | 'arraybuffer';
