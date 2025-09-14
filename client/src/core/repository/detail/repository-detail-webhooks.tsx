import { FC } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import WebhookIcon from '@mui/icons-material/Webhook';
import { RepositoryDataObjectType } from '../../../types/repository';

interface RepositoryDetailWebhooksProps {
  repositoryDataObject: RepositoryDataObjectType;
}

export const RepositoryDetailWebhooks: FC<RepositoryDetailWebhooksProps> = ({
  repositoryDataObject
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
          <WebhookIcon />
          Webhooks
        </Typography>
        
        {repositoryDataObject.webhooks?.length ? (
          <Box>
            {repositoryDataObject.webhooks.map((webhook, index: number) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  {webhook.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {webhook.url}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  <Chip
                    label={webhook.active ? 'Active' : 'Inactive'}
                    color={webhook.active ? 'success' : 'default'}
                    size="small"
                  />
                  {webhook.events?.map((event, eventIndex: number) => (
                    <Chip
                      key={eventIndex}
                      label={event}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No webhooks configured
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
