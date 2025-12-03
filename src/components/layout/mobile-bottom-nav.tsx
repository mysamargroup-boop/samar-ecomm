
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, User, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.433-9.89-9.889-9.89-5.452 0-9.887 4.434-9.887 9.888 0 1.754.456 3.475 1.327 4.969l-1.39 4.025 4.144-1.096zm-1.596-5.454c-.131-.27-.26-.276-.39-.276s-.26.004-.39.004-.39.043-.59.211-.52.51-.62.62-.39.38-.59.62c-.2.24-.39.38-.52.38s-.26-.07-.39-.14c-.13-.07-.52-.24-.99-.48-.59-.29-1.25-.85-1.74-1.39-.49-.54-.82-1.14-.92-1.32-.1-.18-.01-.28.06-.38.07-.1.17-.21.26-.31.09-.1.13-.21.19-.31.07-.1.04-.21 0-.31-.04-.1-.39-1.05-.52-1.43s-.26-.31-.39-.31-.26 0-.39 0c-.13 0-.32.04-.48.21s-.59.58-.59 1.18c0 .6.62 1.38.72 1.48.1.1.92 1.41 2.25 2.8.3.31.56.49.78.62.4.24.74.38.98.48.24.1.45.07.62-.04.18-.1.52-.64.69-1.25.17-.6.17-1.11.12-1.21s-.07-.15-.13-.21z"/>
  </svg>
);


export function MobileBottomNav() {
  const pathname = usePathname();
  const wishlistCount = 3; // Placeholder
  const cartCount = 2; // Placeholder
  const whatsappLink = "https://wa.me/"; // Replace with your WhatsApp number if needed

  const navItems = [
    { href: '/', label: 'Shop', icon: Home },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, count: wishlistCount },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, count: cartCount },
    { href: whatsappLink, label: 'WhatsApp', icon: WhatsAppIcon, isExternal: true },
    { href: '/account', label: 'Account', icon: User },
  ];

  if (pathname.startsWith('/admin') || pathname.startsWith('/samar') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
            const isWhatsApp = item.label === 'WhatsApp';
            const linkContent = (
              <>
                <item.icon className={cn("w-6 h-6 mb-1", isWhatsApp && 'text-green-600 dark:text-green-500')} />
                {item.count && item.count > 0 ? (
                    <Badge className="absolute top-1 right-3 h-5 w-5 justify-center p-0">{item.count}</Badge>
                ): null}
                <span className="text-xs">{item.label}</span>
              </>
            );

            const linkClass = cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted group relative',
              pathname === item.href && !isWhatsApp
                ? 'text-primary'
                : 'text-muted-foreground'
            )

            if (item.isExternal) {
                return (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {linkContent}
                    </a>
                )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={linkClass}
              >
                {linkContent}
              </Link>
            )
        })}
      </div>
    </div>
  );
}
