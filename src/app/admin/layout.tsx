
'use client';

import { AdminSidebar, AdminMobileHeader } from '@/components/layout/admin-sidebar';
import { usePathname, useRouter, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const ADMIN_AUTH_KEY = 'samar-admin-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This check runs only on the client-side, after initial render.
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(adminSession === 'true');
  }, [pathname]); // Re-check on path change if needed, though login flow should handle it.

  // Bypass layout for the admin login pages themselves
  if (pathname.startsWith('/samar') || pathname.startsWith('/login')) {
    return <>{children}</>;
  }

  // Initial loading state, rendered on both server and initial client render.
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Once authentication state is determined on the client, render conditionally.
  if (!isAuthenticated) {
    // Trigger a 404 page render on the client side correctly.
    notFound();
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
