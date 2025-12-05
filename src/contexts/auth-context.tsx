'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { Session, User } from '@supabase/supabase-js';

const AUTH_KEY = 'samar-customer-auth';

interface AuthContextType {
  user: User | null; // Keeping this for potential future use with real Supabase user objects
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage for login state on initial load
    try {
      const storedAuth = sessionStorage.getItem(AUTH_KEY);
      if (storedAuth === 'true') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Could not access session storage:", error);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    try {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsLoggedIn(true);
    } catch (error) {
       console.error("Could not access session storage:", error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
        sessionStorage.removeItem(AUTH_KEY);
        setIsLoggedIn(false);
        // Redirect to home to clear state
        window.location.href = '/'; 
    } catch (error) {
        console.error("Could not access session storage:", error);
    }
  }, []);

  // The following functions are placeholders and not used in the phone OTP demo flow
  // but are kept to prevent breaking other parts of the app that might still reference them.
  const loginWithOtp = async (email: string) => {
    console.log("loginWithOtp called with:", email);
    return { error: { message: "Email/OTP login is not configured." } };
  };

  const verifyOtp = async (email: string, token: string) => {
    console.log("verifyOtp called with:", email, token);
    return { error: { message: "Email/OTP login is not configured." } };
  };
  
  const value = {
    user: null, // This is now a mock, isLoggedIn is the source of truth
    login,
    logout,
    isLoading,
    isLoggedIn,
    // Keep these to prevent breaking `useAuth` destructuring elsewhere
    loginWithOtp: loginWithOtp,
    verifyOtp: verifyOtp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
