import { createContext } from 'react';
import { AlertColor } from '@mui/material/Alert';

export type Alert = {
  key: number;
  message: string;
  severity: AlertColor;
  duration?: number;
};

interface AlertContextType {
  addAlert: (message: string, severity?: AlertColor, duration?: number) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);
