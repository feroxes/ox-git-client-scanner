import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env['REACT_APP_GRAPHQL_URL'] || 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('github-token');
  
  return {
    headers: {
      ...headers,
      ...(token && { 'x-gh-token': token })
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
        extensions
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Repository: {
        fields: {
          webhooks: {
            merge: false
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});
