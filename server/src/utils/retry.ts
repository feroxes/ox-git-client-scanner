import { RetryConfig } from '../types';
import { exponentialBackoff, sleep } from './shared-utils';

export class RetryHandler {
  constructor(private readonly config: RetryConfig) {}

  async execute<T>(
    operation: () => Promise<T>,
    isRetryableError: (error: Error) => boolean = this.defaultRetryableError
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt === this.config.maxRetries || !isRetryableError(lastError)) {
          throw lastError;
        }

        const delay = exponentialBackoff(
          attempt,
          this.config.baseDelay,
          this.config.maxDelay,
          this.config.backoffFactor
        );

        await sleep(delay);
      }
    }

    throw lastError!;
  }

  private defaultRetryableError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('429') ||
      message.includes('rate limit') ||
      message.includes('timeout') ||
      message.includes('5') ||
      message.includes('network')
    );
  }
}


