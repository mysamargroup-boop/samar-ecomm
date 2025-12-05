
'use client';

import { SamarSidebar, SamarMobileHeader } from '@/components/layout/samar-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const SAMAR_AUTH_KEY = 'samar-auth';

export default function SamarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const samarSession = sessionStorage.getItem(SAMAR_AUTH_KEY);
    const authenticated = samarSession === 'true';
    setIsAuthenticated(authenticated);
    setIsAuthChecked(true); 

    const isLoginPage = pathname === '/samar';
    const isVerifyPage = pathname.startsWith('/samar/verify');

    if (!authenticated && !isLoginPage && !isVerifyPage) {
      router.push('/samar');
    }

    if (authenticated && isLoginPage) {
      router.push('/samar/dashboard');
    }
  }, [pathname, router]);

  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
  }
  
  const isLoginPage = pathname === '/samar';
  const isVerifyPage = pathname.startsWith('/samar/verify');

  if (isLoginPage || isVerifyPage) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}<Toaster />
      </ThemeProvider>
    );
  }

  if (isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen bg-background">
            <SamarSidebar />
            <div className="flex flex-col flex-1">
              <SamarMobileHeader />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
      </ThemeProvider>
    );
  }
  
  return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
}
