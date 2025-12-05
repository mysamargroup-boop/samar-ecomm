
'use client';

import { SamarSidebar, SamarMobileHeader } from '@/components/layout/samar-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

const SAMAR_AUTH_KEY = 'samar-auth';

export default function SamarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // State to track if we're on the client and auth has been checked.
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This effect runs only on the client.
    const samarSession = sessionStorage.getItem(SAMAR_AUTH_KEY);
    const authenticated = samarSession === 'true';
    setIsAuthenticated(authenticated);
    setIsAuthChecked(true); // Mark that we've checked authentication status.

    const isLoginPage = pathname === '/samar';
    const isVerifyPage = pathname.startsWith('/samar/verify');

    // If the user is not authenticated and not trying to log in, redirect them.
    if (!authenticated && !isLoginPage && !isVerifyPage) {
      router.push('/samar');
    }

    // If the user IS authenticated and lands on the login page, redirect to dashboard.
    if (authenticated && isLoginPage) {
      router.push('/samar/dashboard');
    }
  // We only want to run this check when the path changes, to handle navigation.
  }, [pathname, router]);

  // While checking auth on the client for the first time, show a loading state.
  // This prevents a flash of the wrong content.
  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
  }
  
  const isLoginPage = pathname === '/samar';
  const isVerifyPage = pathname.startsWith('/samar/verify');

  // If on a public samar page (login/verify), just render the content.
  // The useEffect above will handle redirection if they are already logged in.
  if (isLoginPage || isVerifyPage) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <FirebaseClientProvider>{children}<Toaster /></FirebaseClientProvider>
      </ThemeProvider>
    );
  }

  // If authenticated and not on a login page, show the full admin layout.
  if (isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <FirebaseClientProvider>
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
        </FirebaseClientProvider>
      </ThemeProvider>
    );
  }
  
  // If not authenticated and not a public page, show loading while redirecting.
  return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
}
