export interface Repository {
  name: string;
  size: number;
  owner: string;
  isPrivate: boolean;
  fileCount: number;
  folderCount: number;
  ymlContent: string | undefined;
  webhooks: Webhook[];
}

export interface Webhook {
  id: number;
  name: string;
  active: boolean;
  url: string;
  events: string[];
}

export interface RepositoryListItem {
  name: string;
  size: number;
  owner: string;
}

export interface ScannerConfig {
  token: string;
  timeout?: number;
  retries?: number;
  parallelLimit?: number;
}

export interface ScannerResult<T> {
  data: T;
  success: true;
}

export interface ScannerError {
  success: false;
  error: string;
  code: string;
  details?: unknown;
}

export type ScannerResponse<T> = ScannerResult<T> | ScannerError;

export enum ScannerType {
  GITHUB = 'github',
}

export interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  isOpen: boolean;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface SecurityConfig {
  corsOrigins: string[];
  rateLimit: RateLimitConfig;
}

export interface GraphQLError {
  message: string;
  code: string;
  extensions?: {
    code: string;
    details?: unknown;
  };
}

export interface TreeStatistics {
  fileCount: number;
  folderCount: number;
  yamlPath: string | undefined;
}

export interface GitHubRepositoryInfo {
  name: string;
  size: number;
  private: boolean;
  owner: {
    login: string;
  } | null;
  default_branch: string;
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTreeResponse {
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export interface GitHubWebhook {
  id: number;
  name: string;
  active: boolean;
  url: string;
  events: string[];
  created_at: string;
  updated_at: string;
  config?: {
    url: string;
  }
}

export interface GitHubWebhooksResponse {
  data: GitHubWebhook[];
}

export interface GitHubContentResponse {
  content: string;
  encoding: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
}

export interface GitHubUserResponse {
  login: string;
  id: number;
  avatar_url: string;
  type: string;
}
