'use client';

import { AdminSidebar, AdminMobileHeader } from '@/components/layout/admin-sidebar';
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';

// export const metadata: Metadata = {
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith('/samar')) {
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
