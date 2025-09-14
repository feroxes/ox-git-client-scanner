import { CircuitBreaker } from './circuit-breaker';
import { RetryHandler } from './retry';
import { createTimeoutPromise } from './shared-utils';
import { config } from '../config';

export class ResilientExecutor {
  private readonly circuitBreaker: CircuitBreaker;
  private readonly retryHandler: RetryHandler;

  constructor(
    failureThreshold: number = config.circuitBreaker.failureThreshold,
    recoveryTimeout: number = config.circuitBreaker.recoveryTimeout,
    retryConfig = config.retry
  ) {
    this.circuitBreaker = new CircuitBreaker(failureThreshold, recoveryTimeout);
    this.retryHandler = new RetryHandler(retryConfig);
  }

  async execute<T>(
    operation: () => Promise<T>,
    timeoutMs: number = config.github.timeout,
    errorMessage: string = 'Operation timed out'
  ): Promise<T> {
    return this.circuitBreaker.execute(async () => {
      return this.retryHandler.execute(async () => {
        return createTimeoutPromise(operation(), timeoutMs, errorMessage);
      });
    });
  }
}
