'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, User, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);


export function MobileBottomNav() {
  const pathname = usePathname();
  const wishlistCount = 3; // Placeholder
  const cartCount = 2; // Placeholder

  const navItems = [
    { href: '/', label: 'Shop', icon: Home },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, count: wishlistCount },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, count: cartCount },
    { href: 'https://wa.me/', label: 'WhatsApp', icon: WhatsAppIcon },
    { href: '/account', label: 'Account', icon: User },
  ];

  if (pathname.startsWith('/admin') || pathname.startsWith('/samar') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted group relative',
              pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            {item.count && item.count > 0 ? (
                <Badge className="absolute top-1 right-3 h-5 w-5 justify-center p-0">{item.count}</Badge>
            ): null}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
