import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { RepositoryListItem } from './repository-list-item';
import { RepositoryDataObjectType } from '../../../types/repository';

interface RepositoryListViewProps {
  repositoryDataList: RepositoryDataObjectType[];
  onRepositorySelect: (repositoryName: string) => void;
}

export const RepositoryListView: FC<RepositoryListViewProps> = ({
  repositoryDataList,
  onRepositorySelect,
}) => {
  if (repositoryDataList.length === 0) {
    return (
      <Alert severity="info">
        No repositories found. Make sure your token has the correct permissions.
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Your Repositories
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {repositoryDataList.map((repo, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RepositoryListItem
              name={repo.name}
              owner={repo.owner}
              size={repo.size}
              onClick={() => onRepositorySelect(repo.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
