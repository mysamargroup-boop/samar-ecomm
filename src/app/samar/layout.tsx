
'use client';

import { AdminSidebar, AdminMobileHeader } from '@/components/layout/admin-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';


const ADMIN_AUTH_KEY = 'samar-admin-auth';

export default function SamarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    const authenticated = adminSession === 'true';
    setIsAuthenticated(authenticated);

    if (pathname.startsWith('/samar') && pathname !== '/samar' && pathname !== '/samar/verify' && !authenticated) {
      router.push('/samar');
    }
  }, [pathname, router]);

  if (pathname.startsWith('/samar/verify')) {
    return <>{children}</>;
  }

  // Handle loading and initial state
  if (isAuthenticated === null) {
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not on the login/verify page and not authenticated, show the login page.
  if (!isAuthenticated && !pathname.startsWith('/samar/verify')) {
     if (pathname === '/samar') {
        return <>{children}</>
     }
     router.push('/samar');
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
     return <>{children}</>
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
