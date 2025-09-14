import { GraphQLError } from 'graphql';
import { ScannerFactory } from '../scanners/scanner-factory';
import { ScannerType } from '../types';
import { ErrorHandler } from '../utils/error-handler';
import {
  isValidRepositoryName,
  isValidToken
} from '../utils/shared-utils';


export const resolvers = {
  Query: {
    repositories: async (_: any, __: any, { token }: { token: string }) => {
      try {
        if (!isValidToken(token)) {
          throw ErrorHandler.handleValidationError('Invalid token format');
        }


        const scanner = ScannerFactory.createScanner(ScannerType.GITHUB, { token });
        const result = await scanner.getRepositories();

        if (!result.success) {
          throw new GraphQLError(result.error, {
            extensions: { code: result.code }
          });
        }

        return result.data;
      } catch (error) {
        if (error instanceof GraphQLError) {
          throw error;
        }
        throw new GraphQLError(
          'Failed to fetch repositories',
          {
            extensions: {
              code: 'REPOSITORIES_FETCH_ERROR',
              originalError: error
            }
          }
        );
      }
    },

    repository: async (_: any, { name }: { name: string }, { token }: { token: string }) => {
      try {
        if (!isValidToken(token)) {
          throw ErrorHandler.handleValidationError('Invalid token format');
        }

        if (!isValidRepositoryName(name)) {
          throw ErrorHandler.handleValidationError('Invalid repository name');
        }

        const scanner = ScannerFactory.createScanner(ScannerType.GITHUB, { token });
        const result = await scanner.getRepositoryDetails(name);

        if (!result.success) {
          throw new GraphQLError(result.error, {
            extensions: { code: result.code }
          });
        }

        return result.data;
      } catch (error) {
        if (error instanceof GraphQLError) {
          throw error;
        }
        throw new GraphQLError(
          'Failed to fetch repository details',
          {
            extensions: {
              code: 'REPOSITORY_FETCH_ERROR',
              originalError: error
            }
          }
        );
      }
    }
  }
};


