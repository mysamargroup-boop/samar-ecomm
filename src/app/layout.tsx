import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { WishlistProvider } from '@/contexts/wishlist-context';
import Link from 'next/link';
import { CartProvider } from '@/contexts/cart-context';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Samar Store',
  description: 'The future of e-commerce.',
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn('font-body antialiased flex flex-col min-h-screen', manrope.variable)}>
        <WishlistProvider>
          <CartProvider>
            <AnnouncementBar />
            <AppHeader />
            <main className="flex-grow pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
