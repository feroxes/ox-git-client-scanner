import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      name
      size
      owner
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($name: String!) {
    repository(name: $name) {
      name
      size
      owner
      isPrivate
      fileCount
      folderCount
      ymlContent
      webhooks {
        id
        name
        active
        url
        events
      }
    }
  }
`;
