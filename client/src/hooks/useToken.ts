import { useState, useEffect } from 'react';

const TOKEN_STORAGE_KEY = 'github-token';

export const useToken = () => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      setTokenState(storedToken);
    }
    setIsLoading(false);
  }, []);

  const setToken = (newToken: string) => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setTokenState(null);
  };

  return {
    token,
    isLoading,
    setToken,
    clearToken
  };
};
