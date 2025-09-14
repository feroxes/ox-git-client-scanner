import { SecurityConfig, RetryConfig } from '../types';

export const config = {
  port: process.env['PORT'] ? parseInt(process.env['PORT'], 10) : 4000,
  nodeEnv: process.env['NODE_ENV'] || 'development',
  
  security: {
    corsOrigins: process.env['CORS_ORIGINS']?.split(',') || ['http://localhost:3000'],
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100 // limit each IP to 100 requests per windowMs
    }
  } as SecurityConfig,

  retry: {
    maxRetries: 2,
    baseDelay: 1000,
    maxDelay: 10000, // 10 seconds
    backoffFactor: 2
  } as RetryConfig,

  circuitBreaker: {
    failureThreshold: 5,
    recoveryTimeout: 30000, // 30 seconds
    monitoringPeriod: 60000 // 1 minute
  },

  github: {
    timeout: 10000, // 10 seconds
    parallelLimit: 2,
    maxFilesLimit: 100000 // Maximum files in repository tree
  }
};

export type Config = typeof config;


