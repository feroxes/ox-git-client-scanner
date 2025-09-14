import { FormEvent, FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTokenContext } from '../../contexts/token-context';
import { useAlert } from '../../hooks/useAlert';

export const TokenForm: FC = () => {
  const { setToken } = useTokenContext();
  const { addAlert } = useAlert();

  const handleTokenSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newToken = formData.get('token') as string;
    
    if (newToken && newToken.length > 20) {
      setToken(newToken);
    } else {
      addAlert('Token must be at least 20 characters long', 'error');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 2 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to OX GitHub Scanner
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Enter your GitHub Personal Access Token to start scanning repositories
        </Typography>

        <Box component="form" onSubmit={handleTokenSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="token"
            label="GitHub Personal Access Token"
            type="password"
            helperText="Token must have Contents Metadata Webhooks - read-only rights"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Start Scanning
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
