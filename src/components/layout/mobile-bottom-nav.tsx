
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
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.433-9.886-9.889-9.886-5.448 0-9.885 4.438-9.885 9.886 0 2.098.6 4.13 1.7 5.898l-1.156 4.254 4.383-1.147z" />
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
