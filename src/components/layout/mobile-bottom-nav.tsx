
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
    <path d="M19.004 4.998a9.89 9.89 0 0 0-14.018 14.018 9.91 9.91 0 0 0 14.018-14.018zM8.053 17.53a7.81 7.81 0 0 1-4.22-1.204l-1.373.435.45-1.34a7.81 7.81 0 0 1-1.12-4.49 7.82 7.82 0 0 1 15.632.001 7.82 7.82 0 0 1-7.82 7.818zm4.49-5.11a.42.42 0 0 0-.3-.41l-1.15-.56a.42.42 0 0 0-.49.07c-.12.15-.45.56-.55.68-.1.12-.2.13-.37.08-.17-.05-1.02-.38-1.94-1.2a10.66 10.66 0 0 1-1.36-1.51.46.46 0 0 1 .05-.44l.4-.46c.11-.13.22-.22.33-.33.11-.11.06-.26 0-.37l-1.51-1.51a.42.42 0 0 0-.58-.04l-.48.46s-.45.45-.45 1.08c0 .63.45 1.25.52 1.34.07.09 1.48 2.3 3.6 3.2.5.21.8.34.93.42.3.17.48.14.65.08.18-.06.56-.23.64-.45.08-.22.08-.41.06-.45z" />
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
                <item.icon className={cn("w-6 h-6 mb-1", isWhatsApp && 'text-green-600')} />
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
