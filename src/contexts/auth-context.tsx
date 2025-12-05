
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loginWithOtp: (email: string) => Promise<{ error: any }>;
  verifyOtp: (email: string, token: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginWithOtp: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null }),
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithOtp = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    return { error };
  }, []);

  const verifyOtp = useCallback(async (email: string, token: string) => {
    const { data: { session }, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    // setUser is handled by onAuthStateChange
    return { error };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    // setUser is handled by onAuthStateChange
    window.location.href = '/'; 
  }, []);
  
  const isLoggedIn = !!user;

  const value = {
    user,
    loginWithOtp,
    verifyOtp,
    logout,
    isLoading,
    isLoggedIn, // For components that just need a boolean check
  };

  return (
    <AuthContext.Provider value={value as any}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
