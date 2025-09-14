import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { apolloClient } from './apollo/apollo-client';
import { TokenProvider } from './contexts/token-context';
import { AlertProvider } from './contexts/alert/alert-provider';
import App from './core/app';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </AlertProvider>
    </ThemeProvider>
  </ApolloProvider>
);
