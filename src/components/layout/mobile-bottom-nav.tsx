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
    <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.55.03.63-.04.08-.33.38-.67.63-.34.25-.67.38-.96.38-.29,0-1.04-.13-2.04-.79-1-.67-1.75-1.5-1.92-1.75s-.33-.38-.33-.63c0-.25.13-.38.25-.5.13-.13.25-.17.38-.17.08,0,.17,0,.25.04.13.04.2.08.29.33.08.25.33.88.38.96.04.08.08.13.04.25-.04.13-.08.17-.17.25-.08.08-.17.13-.25.17-.08.04-.17.08-.25.04-.08-.04-.25-.08-.38-.17s-.33-.2-.46-.38c-.13-.17-.25-.33-.38-.55-.13-.2-.2-.38-.25-.5s-.04-.25,0-.38.13-.25.2-.33c.08-.08.17-.17.29-.25.13-.08.2-.13.25-.2.04-.08.08-.17.04-.25-.04-.08-.55-1.34-.75-1.84-.2-.5-.42-.55-.55-.55-.13,0-.25,0-.38.04s-.33.17-.46.33c-.13.17-.5.59-.5,1.46,0,.87.5,1.71.59,1.84.08.13,1.04,1.6,2.5,2.21.38.17.67.25.92.33.25.08.5.08.67.04.25-.04.83-.33,1-1.13s.17-.96.13-1.04c-.04-.08-.17-.13-.33-.25zM12.04 2A10 10 0 0 0 2 12.04c0 3.34 1.66 6.3 4.25 8.1l-1.46 3.58 3.67-1.45c1.88.96 4,1.45 6.16,1.45a10 10 0 0 0 10-10 10 10 0 0 0-10-10.04z"/>
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
