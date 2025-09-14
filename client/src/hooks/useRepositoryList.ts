import { useQuery, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { GET_REPOSITORIES } from '../apollo/queries';
import { useAlert } from './useAlert';
import { useTokenContext } from '../contexts/token-context';

export const useRepositoryList = () => {
  const { addAlert } = useAlert();
  const { clearToken } = useTokenContext();
  const client = useApolloClient();
  
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message;
      client.clearStore();
      clearToken();
      addAlert(errorMessage, 'error');
    }
  }, [error, client, clearToken, addAlert]);

  return {
    data: data?.repositories || [],
    loading,
    error: null,
    refetch
  };
};
