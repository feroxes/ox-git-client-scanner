import {
  Repository,
  RepositoryListItem,
  ScannerConfig,
  ScannerResponse,
  ScannerType
} from '../types';

export abstract class BaseScanner {
  protected readonly config: ScannerConfig;
  protected readonly type: ScannerType;

  constructor(config: ScannerConfig, type: ScannerType) {
    this.config = config;
    this.type = type;
  }

  abstract getRepositories(): Promise<ScannerResponse<RepositoryListItem[]>>;
  abstract getRepositoryDetails(name: string): Promise<ScannerResponse<Repository>>;

  protected createSuccessResponse<T>(data: T): ScannerResponse<T> {
    return { data, success: true };
  }

  protected createErrorResponse(error: string, code: string): ScannerResponse<never> {
    return {
      success: false,
      error,
      code
    };
  }

  getType(): ScannerType {
    return this.type;
  }
}
