
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    const authenticated = adminSession === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);

    if (!authenticated && !pathname.startsWith('/samar/verify')) {
      // No need to check for /samar because the redirect will handle it
      // but if we are on a deeper path, we need to redirect.
       if(pathname !== '/samar'){
          router.push('/samar');
       }
    }
  }, [pathname, router]);
  
  if (pathname.startsWith('/samar/verify')) {
    return <>{children}</>;
  }

  // This handles the server render and loading state
  if (isLoading || isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
     // Children will be the login page at /samar
     return <>{children}</>;
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
