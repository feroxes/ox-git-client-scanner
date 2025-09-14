import { Octokit } from 'octokit';
import {
  Repository,
  RepositoryListItem,
  ScannerConfig,
  ScannerResponse,
  ScannerType,
  GitHubRepositoryInfo,
  GitHubTreeItem,
  GitHubWebhook,
  GitHubContentResponse,
  GitHubUserResponse
} from '../types';
import {
  analyzeTree,
  isValidRepositoryName,
  isValidToken
} from '../utils/shared-utils';
import { BaseScanner } from './base-scanner';
import { ResilientExecutor } from '../utils/resilient-executor';
import { ErrorHandler } from '../utils/error-handler';
import { config } from '../config';


export class GitHubScanner extends BaseScanner {
  private readonly octokit: Octokit;
  private readonly resilientExecutor: ResilientExecutor;
  private currentUserCache: string | null = null;

  constructor(scannerConfig: ScannerConfig & { token: string }) {
    super(scannerConfig, ScannerType.GITHUB);

    if (!isValidToken(scannerConfig.token)) {
      throw ErrorHandler.handleValidationError('Invalid GitHub token format');
    }

    this.octokit = new Octokit({
      auth: scannerConfig.token,
      request: { timeout: scannerConfig.timeout || config.github.timeout }
    });

    this.resilientExecutor = new ResilientExecutor();
  }

  async getRepositories(): Promise<ScannerResponse<RepositoryListItem[]>> {
    try {
      const result = await this.resilientExecutor.execute(async () => {
        const response = await this.octokit.rest.repos.listForAuthenticatedUser({
          per_page: 100,
          sort: 'updated'
        });
        
        return response.data.map(repo => { 
          return {
            name: repo.name,
            size: repo.size,
            owner: repo.owner?.login || 'unknown'
          }
        });
      });

      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(
        ErrorHandler.handleGitHubError(error).message,
        'GITHUB_API_ERROR'
      );
    }
  }

  async getRepositoryDetails(name: string): Promise<ScannerResponse<Repository>> {
    try {
      if (!isValidRepositoryName(name)) {
        throw ErrorHandler.handleValidationError('Invalid repository name');
      }

      const result = await this.resilientExecutor.execute(async () => {
        const [repoResponse, treeResponse, hooksResponse] = await Promise.all([
          this.getRepositoryInfo(name),
          this.getRepositoryTree(name),
          this.getRepositoryWebhooks(name)
        ]);
          
        const treeStats = analyzeTree(treeResponse);
        const ymlContent = await this.getYamlContent(name, treeStats.yamlPath);

        return {
          name: repoResponse.name,
          size: repoResponse.size,
          owner: repoResponse.owner?.login || 'unknown',
          isPrivate: repoResponse.private,
          fileCount: treeStats.fileCount,
          folderCount: treeStats.folderCount,
          ymlContent,
          webhooks: hooksResponse.map(hook => ({
            id: hook.id,
            name: hook.name,
            active: hook.active,
            url: hook.config?.url || '',
            events: hook.events
          }))
        };
      });

      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(
        ErrorHandler.handleGitHubError(error).message,
        'GITHUB_API_ERROR'
      );
    }
  }

  private async getRepositoryInfo(name: string): Promise<GitHubRepositoryInfo> {
    return this.resilientExecutor.execute(async () => {
      const response = await this.octokit.rest.repos.get({
        owner: await this.getCurrentUser(),
        repo: name
      });
      return response.data as GitHubRepositoryInfo;
    });
  }

  private async getRepositoryTree(name: string): Promise<GitHubTreeItem[]> {
    const owner = await this.getCurrentUser();
    return this.resilientExecutor.execute(async () => {
      const repoInfo = await this.octokit.rest.repos.get({
        owner,
        repo: name
      });
      
      const response = await this.octokit.rest.git.getTree({
        owner,
        repo: name,
        tree_sha: repoInfo.data.default_branch,
        recursive: 'true'
      });
      
      const tree = response.data.tree || [];
      
      if (tree.length > config.github.maxFilesLimit) {
        throw new Error(`Repository too large: exceeds ${config.github.maxFilesLimit} files limit`);
      }
      
      return tree as GitHubTreeItem[];
    }, config.github.timeout, 'Repository tree scan timeout');
  }

  private async getRepositoryWebhooks(name: string): Promise<GitHubWebhook[]> {
    return this.resilientExecutor.execute(async () => {
      const response = await this.octokit.rest.repos.listWebhooks({
        owner: await this.getCurrentUser(),
        repo: name
      });
      return response.data as GitHubWebhook[];
    });
  }

  private async getYamlContent(name: string, yamlPath: string | undefined): Promise<string | undefined> {
    if (!yamlPath) return undefined;

    try {
      const response = await this.resilientExecutor.execute(async () => {
        return this.octokit.rest.repos.getContent({
          owner: await this.getCurrentUser(),
          repo: name,
          path: yamlPath
        });
      });
      
      const contentData = response.data as GitHubContentResponse;
      if ('content' in contentData && contentData.content) {
        return Buffer.from(contentData.content, 'base64').toString('utf-8');
      }
    } catch (error) {
      console.warn(`Failed to fetch YAML content for ${yamlPath}:`, error);
    }

    return undefined;
  }

  private async getCurrentUser(): Promise<string> {
    if (this.currentUserCache) {
      return this.currentUserCache;
    }

    const response = await this.resilientExecutor.execute(async () => {
      return this.octokit.rest.users.getAuthenticated();
    });

    const userData = response.data as GitHubUserResponse;
    this.currentUserCache = userData.login;
    return this.currentUserCache;
  }
}


