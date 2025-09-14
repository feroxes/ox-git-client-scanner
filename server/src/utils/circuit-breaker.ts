import { CircuitBreakerState } from '../types';

export class CircuitBreaker {
  private state: CircuitBreakerState = {
    failures: 0,
    lastFailureTime: 0,
    isOpen: false
  };

  constructor(
    private readonly failureThreshold: number = 5,
    private readonly recoveryTimeout: number = 30000
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state.isOpen) {
      if (Date.now() - this.state.lastFailureTime > this.recoveryTimeout) {
        this.state.isOpen = false;
        this.state.failures = 0;
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.state.failures = 0;
    this.state.isOpen = false;
  }

  private onFailure(): void {
    this.state.failures++;
    this.state.lastFailureTime = Date.now();

    if (this.state.failures >= this.failureThreshold) {
      this.state.isOpen = true;
    }
  }

  getState(): CircuitBreakerState {
    return { ...this.state };
  }
}


