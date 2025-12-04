
'use client';

import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AUTH_STORAGE_KEY = 'samar-store-auth';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        setIsLoggedIn(JSON.parse(storedAuth));
      }
    } catch (error) {
      console.error("Failed to parse auth state from sessionStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
        try {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isLoggedIn));
        } catch (error) {
            console.error("Failed to save auth state to sessionStorage", error);
        }
    }
  }, [isLoggedIn, isInitialized]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Redirect to home page on logout
    router.push('/');
  };

  const value = { isLoggedIn, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
