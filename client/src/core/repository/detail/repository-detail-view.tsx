import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RepositoryDetailInformation } from './repository-detail-information';
import { RepositoryDetailWebhooks } from './repository-detail-webhooks';
import { RepositoryDetailYaml } from './repository-detail-yaml';
import { RepositoryDataObjectType } from '../../../types/repository';

interface RepositoryDetailViewProps {
  repositoryDataObject: RepositoryDataObjectType;
  onBackToList: () => void;
  setSelectedRepository: (repositoryName: string | null) => void;
  error: any;
}

export const RepositoryDetailView: FC<RepositoryDetailViewProps> = ({
  repositoryDataObject,
  onBackToList,
  setSelectedRepository,
  error,
}) => {

  useEffect(() => {
    if (error) setSelectedRepository(null);
  }, []);

  if (error) return null;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBackToList}
            variant="outlined"
            size="small"
          >
            Back to List
          </Button>
          <Typography variant="h4" component="h1">
            {repositoryDataObject.name}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <RepositoryDetailInformation repositoryDataObject={repositoryDataObject} />
        </Grid>

        <Grid item xs={12} md={4}>
          <RepositoryDetailWebhooks repositoryDataObject={repositoryDataObject} />
        </Grid>

        <Grid item xs={12}>
          <RepositoryDetailYaml repositoryDataObject={repositoryDataObject} />
        </Grid>
      </Grid>
    </Box>
  );
};
