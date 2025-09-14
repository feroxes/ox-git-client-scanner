import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface RepositoryListItemProps {
  name: string;
  owner: string;
  size: number;
  onClick: () => void;
}

export const RepositoryListItem: FC<RepositoryListItemProps> = ({
  name,
  owner,
  size,
  onClick
}) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Owner: {owner}
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Chip
            label={`${(size / 1024).toFixed(1)} KB`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
