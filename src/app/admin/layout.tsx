
'use client';

import { AdminSidebar, AdminMobileHeader } from '@/components/layout/admin-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotFound from '../not-found';

const ADMIN_AUTH_KEY = 'samar-admin-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This check runs only on the client-side
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  
  if (pathname.startsWith('/samar') || pathname.startsWith('/login')) {
    return <>{children}</>
  }

  if (isLoading) {
    // You can show a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // If not authenticated, show a 404 page to obscure the admin area
    return <NotFound />;
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
