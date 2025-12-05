
'use client';

import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { WishlistProvider } from '@/contexts/wishlist-context';
import Link from 'next/link';
import { CartProvider } from '@/contexts/cart-context';
import { AuthProvider } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { FirebaseClientProvider } from '@/firebase';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

function AnnouncementBar() {
  return (
    <div className="bg-muted text-muted-foreground text-sm text-center py-2 px-4">
      <span>Get Extra 5% Off On Prepaid Orders | Code: BOATHEAD | </span>
      <Link href="/products" className="underline font-semibold hover:text-primary">
        Shop Now
      </Link>
    </div>
  )
}

function AppStructure({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSamarRoute = pathname.startsWith('/samar');
  const isLoginRoute = pathname.startsWith('/login');

  if (isSamarRoute || isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBar />
      <AppHeader />
      <main className="flex-grow pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <Toaster />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E53E3E" />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen', poppins.variable)} suppressHydrationWarning>
        <FirebaseClientProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <AppStructure>
                  {children}
                </AppStructure>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
