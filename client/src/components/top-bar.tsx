import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useApolloClient } from '@apollo/client';
import { useTokenContext } from '../contexts/token-context';


export const TopBar: FC<{}> = () => {
  const { token, clearToken } = useTokenContext();
  const client = useApolloClient();

  const handleLogout = async () => {
    await client.clearStore();
    clearToken();
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OX GitHub Scanner
        </Typography>
        {!!token && (
          <Button color="inherit" onClick={handleLogout}>
              Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
