import React, { createContext, useState, useContext, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, users: User[]) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const item = window.localStorage.getItem('manrura_currentUser');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        window.localStorage.setItem('manrura_currentUser', JSON.stringify(currentUser));
      } else {
        window.localStorage.removeItem('manrura_currentUser');
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [currentUser]);

  const login = async (email: string, password: string, users: User[]): Promise<void> => {
    const user = users.find(u => u.email === email);
    
    if (user && user.password === password) {
      // Create a user object without the password for security
      const { password: _, ...userToStore } = user;
      setCurrentUser(userToStore);
    } else {
      throw new Error('Invalid email or password.');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
