
'use client';

import { AdminSidebar, AdminMobileHeader } from '@/components/layout/admin-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotFound from '../not-found';

const ADMIN_AUTH_KEY = 'samar-admin-auth';

export default function SamarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    const authenticated = adminSession === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);

    if (!authenticated && pathname !== '/samar' && !pathname.startsWith('/samar/verify')) {
      router.push('/samar');
    }
  }, [pathname, router]);
  
  if (pathname === '/samar' || pathname.startsWith('/samar/verify')) {
    return <>{children}</>;
  }

  // Initial server render and client-side loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // After loading, if not authenticated, redirect
  if (!isAuthenticated) {
     router.push('/samar');
     return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
  }

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
