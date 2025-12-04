
'use client';

import { SamarSidebar, SamarMobileHeader } from '@/components/layout/samar-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';

const SAMAR_AUTH_KEY = 'samar-auth';

export default function SamarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    const samarSession = sessionStorage.getItem(SAMAR_AUTH_KEY);
    const authenticated = samarSession === 'true';
    setIsAuthenticated(authenticated);
    setIsAuthChecked(true); // Mark that we've checked authentication
  }, []);

  useEffect(() => {
    // This effect handles redirection after auth has been checked
    if (!isAuthChecked) {
      return; // Do nothing until we've checked the auth status
    }

    const isLoginPage = pathname === '/samar';
    const isVerifyPage = pathname.startsWith('/samar/verify');

    // If authenticated, and on a login/verify page, redirect to dashboard
    if (isAuthenticated && isLoginPage) {
      router.push('/samar/dashboard');
    }
    
    // If not authenticated and not on a login/verify page, redirect to login
    if (!isAuthenticated && !isLoginPage && !isVerifyPage) {
      router.push('/samar');
    }
  }, [pathname, isAuthenticated, isAuthChecked, router]);

  // While checking for authentication, show a loading state to prevent hydration mismatch.
  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
  }
  
  const isLoginPage = pathname === '/samar';
  const isVerifyPage = pathname.startsWith('/samar/verify');

  // If on a public samar page (login/verify), just render the content.
  if (isLoginPage || isVerifyPage) {
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>;
  }

  // If authenticated, show the full samar layout.
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
      </ThemeProvider>
    );
  }
  
  // As a fallback during redirection, show loading.
  return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
}
