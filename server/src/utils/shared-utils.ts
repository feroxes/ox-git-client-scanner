import { GitHubTreeItem, TreeStatistics } from '../types';

export const createTimeoutPromise = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = 'Operation timed out'
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    )
  ]);
};

export const exponentialBackoff = (
  attempt: number,
  baseDelay: number,
  maxDelay: number,
  backoffFactor: number
): number => {
  const delay = baseDelay * Math.pow(backoffFactor, attempt);
  return Math.min(delay, maxDelay);
};

export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const sanitizeToken = (token: string): string => {
  if (token.length <= 8) return '***';
  return `${token.slice(0, 4)}***${token.slice(-4)}`;
};

export const isValidRepositoryName = (name: string): boolean => {
  return /^[a-zA-Z0-9._-]+$/.test(name) && name.length > 0 && name.length <= 100;
};

export const isValidToken = (token: string): boolean => {
  return typeof token === 'string' && token.length > 20;
};

export const analyzeTree = (tree: GitHubTreeItem[]): TreeStatistics => {
  if (!Array.isArray(tree)) {
    return { fileCount: 0, folderCount: 0, yamlPath: undefined };
  }

  let fileCount = 0;
  let folderCount = 0;
  let yamlPath: string | undefined = undefined;

  for (const item of tree) {
    if (item.type === 'blob') {
      fileCount++;
      
      if (!yamlPath && (item.path?.endsWith('.yml') || item.path?.endsWith('.yaml'))) {
        yamlPath = item.path;
      }
    } else if (item.type === 'tree') {
      folderCount++;
    }
  }

  return { fileCount, folderCount, yamlPath };
};

export const createGraphQLError = (
  message: string,
  code: string,
  extensions?: Record<string, unknown>
) => {
  const error = new Error(message);
  (error as any).extensions = {
    code,
    ...extensions
  };
  return error;
};
