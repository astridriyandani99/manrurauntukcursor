import React, { createContext, useState, useContext, useEffect } from 'react';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | null>(null);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(() => {
    try {
      return window.localStorage.getItem('gemini_api_key');
    } catch (error) {
      console.error("Error reading API key from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (apiKey) {
        window.localStorage.setItem('gemini_api_key', apiKey);
      } else {
        window.localStorage.removeItem('gemini_api_key');
      }
    } catch (error) {
      console.error("Error writing API key to localStorage", error);
    }
  }, [apiKey]);

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
