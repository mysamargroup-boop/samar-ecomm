// This file is no longer used and has been moved to the trash.
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

const ADMIN_AUTH_KEY = 'samar-admin-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const adminSession = sessionStorage.getItem(ADMIN_AUTH_KEY);
    const authenticated = adminSession === 'true';
    
    setIsAuthenticated(authenticated);
    setIsAuthChecked(true);

    if (authenticated) {
        // If authenticated, we don't need to do anything here,
        // the main layout will show the children.
    } else {
        // If not authenticated, trigger a 404 not found.
        notFound();
    }
  }, [router]);

  // While checking auth on the client, you can show a loader
  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If authenticated, render the children (the page content)
  if (isAuthenticated) {
      return <>{children}</>;
  }

  // This return is for the server render and for the client before auth is checked
  // and confirmed. It prevents a flash of content.
  return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
}
