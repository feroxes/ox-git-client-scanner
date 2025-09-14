import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { RepositoryDataObjectType } from "../../../types/repository";

interface RepositoryDetailInformationProps {
  repositoryDataObject: RepositoryDataObjectType;
}

export const RepositoryDetailInformation: FC<RepositoryDetailInformationProps> = ({
  repositoryDataObject
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Repository Information
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Owner
            </Typography>
            <Typography variant="body1">
              {repositoryDataObject.owner}
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Size
            </Typography>
            <Typography variant="body1">
              {(repositoryDataObject.size / 1024).toFixed(1)} KB
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Files
            </Typography>
            <Typography variant="body1">
              {repositoryDataObject.fileCount}
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Folders
            </Typography>
            <Typography variant="body1">
              {repositoryDataObject.folderCount}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Visibility
            </Typography>
            <Chip
              label={repositoryDataObject.isPrivate ? 'Private' : 'Public'}
              color={repositoryDataObject.isPrivate ? 'error' : 'success'}
              size="small"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
