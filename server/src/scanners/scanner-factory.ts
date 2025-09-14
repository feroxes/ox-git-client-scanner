import { z } from 'zod';
import { ScannerType, ScannerConfig } from '../types';
import { BaseScanner } from './base-scanner';
import { GitHubScanner } from './github-scanner';
import { ErrorHandler } from '../utils/error-handler';

const ScannerConfigSchema = z.object({
  token: z.string().min(20),
  timeout: z.number().optional(),
  retries: z.number().optional(),
  parallelLimit: z.number().optional()
});

export class ScannerFactory {
  static createScanner(type: ScannerType, config: ScannerConfig): BaseScanner {
    try {
      const validatedConfig = ScannerConfigSchema.parse(config);

      switch (type) {
        case ScannerType.GITHUB:
          return new GitHubScanner(validatedConfig as ScannerConfig & { token: string });
        default:
          throw new Error(`Unsupported scanner type: ${type}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw ErrorHandler.handleValidationError(
          `Invalid scanner configuration: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      throw error;
    }
  }
}


