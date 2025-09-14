import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface QueryResult<T> {
  data: T;
  loading: boolean;
  error: any;
}

interface DataStateResolverProps<T> {
  query: QueryResult<T>;
  children: (data: T) => ReactNode;
}

export const DataStateResolver: FC<DataStateResolverProps<any>> = ({
  query,
  children
}) => {
  const { data, error, loading } = query;
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }
  return <>{children({data, error})}</>;
};
