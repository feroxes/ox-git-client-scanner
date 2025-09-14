import { createContext, useContext, ReactNode } from 'react';
import { useToken } from '../hooks/useToken';

interface TokenContextType {
  token: string | null;
  isLoading: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const tokenHook = useToken();

  return (
    <TokenContext.Provider value={tokenHook}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};
