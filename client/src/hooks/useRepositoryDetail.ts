import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_REPOSITORY_DETAILS } from '../apollo/queries';
import { useAlert } from './useAlert';

export const useRepositoryDetail = (repositoryName: string) => {
  const { addAlert } = useAlert();
  
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { name: repositoryName }
  });

  useEffect(() => {
    if (error) {
      const errorMessage = error.message;
      addAlert(errorMessage, 'error');
    }
  }, [error, addAlert]);

  return {
    data: data?.repository || null,
    loading,
    error,
    refetch
  };
};
