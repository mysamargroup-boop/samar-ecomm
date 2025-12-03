
'use client';

import { AdminSidebar, AdminMobileHeader } from '@/components/layout/admin-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ADMIN_AUTH_KEY = 'samar-admin-auth';

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
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    const authenticated = adminSession === 'true';
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
    if (isAuthenticated && (isLoginPage || isVerifyPage)) {
      router.push('/samar/products');
    }
    
    // If not authenticated and not on a login/verify page, redirect to login
    if (!isAuthenticated && !isLoginPage && !isVerifyPage) {
      router.push('/samar');
    }
  }, [pathname, isAuthenticated, isAuthChecked, router]);

  // While checking for authentication, show a loading state to prevent hydration mismatch.
  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const isLoginPage = pathname === '/samar';
  const isVerifyPage = pathname.startsWith('/samar/verify');

  // If on a public admin page (login/verify), just render the content.
  if (isLoginPage || isVerifyPage) {
    return <>{children}</>;
  }

  // If authenticated, show the full admin layout.
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminMobileHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </div>
      </div>
    );
  }
  
  // As a fallback during redirection, show loading.
  return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
}
