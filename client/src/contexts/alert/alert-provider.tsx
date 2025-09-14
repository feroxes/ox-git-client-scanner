import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import React, { ReactNode, useState } from 'react';
import { AlertContext, Alert as AlertType } from './alert-context';

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = (message: string, severity: 'error' | 'warning' | 'info' | 'success' = 'info', duration = 3000) => {
    const key = Date.now() + Math.random();
    setAlerts((prev) => [...prev, { key, message, severity, duration }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.key !== key));
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 10,
          zIndex: (theme) => theme.zIndex.snackbar,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {alerts.map((a) => (
          <Alert
            key={a.key}
            severity={a.severity}
            variant="filled"
            onClose={() => setAlerts((prev) => prev.filter((item) => item.key !== a.key))}
            sx={{
              borderRadius: '16px',
            }}
          >
            {a.message}
          </Alert>
        ))}
      </Box>
    </AlertContext.Provider>
  );
};
