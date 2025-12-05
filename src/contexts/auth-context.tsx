
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_STORAGE_KEY = 'customer-auth';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This effect runs only on the client.
    try {
      const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === 'true') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Could not access sessionStorage:", error);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Could not access sessionStorage:", error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      setIsLoggedIn(false);
      // Use window.location.href for a full refresh to clear all state
      window.location.href = '/'; 
    } catch (error) {
      console.error("Could not access sessionStorage:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
