import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CodeIcon from '@mui/icons-material/Code';
import { RepositoryDataObjectType } from '../../../types/repository';

interface RepositoryDetailYamlProps {
  repositoryDataObject: RepositoryDataObjectType;
}

export const RepositoryDetailYaml: FC<RepositoryDetailYamlProps> = ({
  repositoryDataObject
}) => {
  
  if (!repositoryDataObject.ymlContent) return null;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
          <CodeIcon />
          YAML Configuration
        </Typography>
        <Paper sx={{ 
          p: 2, 
          backgroundColor: (theme) => theme.palette.grey[900],
          color: (theme) => theme.palette.text.primary,
          fontFamily: 'monospace'
        }}>
          <pre style={{ 
            margin: 0, 
            fontSize: '0.875rem', 
            overflow: 'auto',
            color: '#ffffff'
          }}>
            {repositoryDataObject.ymlContent}
          </pre>
        </Paper>
      </CardContent>
    </Card>
  );
};
