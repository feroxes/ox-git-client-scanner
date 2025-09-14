import { GraphQLError } from '../types';

export class ErrorHandler {
  static createGraphQLError(
    message: string,
    code: string,
    extensions?: Record<string, unknown>
  ): GraphQLError {
    return {
      message,
      code,
      extensions
    } as GraphQLError;
  }

  static handleGitHubError(error: any): GraphQLError {
    const status = error.status || error.response?.status;
    const message = error.message || 'Unknown GitHub API error';

    switch (status) {
      case 401:
        return this.createGraphQLError(
          'Invalid token or insufficient scopes (need repo, admin:repo_hook)',
          'INVALID_TOKEN',
          { status, originalMessage: message }
        );
      case 403:
        return this.createGraphQLError(
          'Forbidden - check token permissions',
          'FORBIDDEN',
          { status, originalMessage: message }
        );
      case 404:
        return this.createGraphQLError(
          'Repository not found or no access',
          'REPOSITORY_NOT_FOUND',
          { status, originalMessage: message }
        );
      case 429:
        return this.createGraphQLError(
          'Hit GitHub rate-limit — try again later',
          'RATE_LIMIT_EXCEEDED',
          { status, originalMessage: message }
        );
      default:
        if (status >= 500) {
          return this.createGraphQLError(
            'GitHub server error - please try again later',
            'GITHUB_SERVER_ERROR',
            { status, originalMessage: message }
          );
        }
        return this.createGraphQLError(
          'GitHub API error',
          'GITHUB_API_ERROR',
          { status, originalMessage: message }
        );
    }
  }

  static handleTimeoutError(): GraphQLError {
    return this.createGraphQLError(
      'GitHub is slow right now; please retry',
      'TIMEOUT_ERROR'
    );
  }

  static handleValidationError(message: string): GraphQLError {
    return this.createGraphQLError(message, 'VALIDATION_ERROR');
  }

  static handleCircuitBreakerError(): GraphQLError {
    return this.createGraphQLError(
      'Service temporarily unavailable - too many failures',
      'CIRCUIT_BREAKER_OPEN'
    );
  }
}


