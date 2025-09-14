import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Repository {
    name: String!
    size: Int!
    owner: String!
    isPrivate: Boolean!
    fileCount: Int!
    folderCount: Int!
    ymlContent: String
    webhooks: [Webhook!]!
  }

  type Webhook {
    id: Int!
    name: String!
    active: Boolean!
    url: String!
    events: [String!]!
  }

  type RepositoryListItem {
    name: String!
    size: Int!
    owner: String!
  }

  type Query {
    repositories: [RepositoryListItem!]!
    repository(name: String!): Repository!
  }

  type Error {
    message: String!
    code: String!
    details: String
  }

  union RepositoryResult = Repository | Error
  union RepositoriesResult = RepositoriesList | Error

  type RepositoriesList {
    repositories: [RepositoryListItem!]!
  }
`;


