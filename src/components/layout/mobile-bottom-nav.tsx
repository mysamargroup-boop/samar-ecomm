
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, User, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    {...props}
  >
    <path d="M16.001 0.001C7.178 0.001 0.002 7.177 0.002 16.001c0 2.801 0.722 5.518 2.062 7.938l-2.064 7.585 7.781-2.04c2.316 1.189 4.908 1.815 7.422 1.815h0.001c8.823 0 16-7.177 16-16.001 0-8.823-7.177-16-16-16.001zM16.001 29.539c-2.428 0-4.786-0.648-6.853-1.849l-0.493-0.292-5.097 1.336 1.359-4.966-0.32-0.518c-1.31-2.119-2.012-4.578-2.012-7.151 0-7.425 6.041-13.466 13.466-13.466 7.425 0 13.466 6.041 13.466 13.466-0.001 7.425-6.041 13.466-13.466 13.466zM23.326 19.467c-0.239-0.12-1.411-0.697-1.63-0.778-0.219-0.082-0.378-0.121-0.537 0.121s-0.617 0.778-0.757 0.937-0.28 0.181-0.519 0.060c-0.239-0.12-1.01-0.375-1.923-1.187-0.71-0.634-1.189-1.423-1.328-1.662-0.14-0.239-0.012-0.367 0.109-0.488s0.239-0.279 0.359-0.419c0.12-0.14 0.159-0.239 0.239-0.399s0.04-0.3 0-0.419c-0.040-0.12-0.537-1.288-0.737-1.767s-0.399-0.404-0.537-0.41c-0.138-0.005-0.299-0.005-0.457-0.005s-0.399 0.06-0.618 0.299c-0.219 0.239-0.836 0.816-0.836 1.99s0.856 2.309 0.976 2.469c0.12 0.159 1.685 2.585 4.089 3.593 0.584 0.245 1.042 0.39 1.402 0.505 0.599 0.187 1.144 0.161 1.572 0.098 0.468-0.068 1.411-0.578 1.609-1.138s0.199-1.041 0.139-1.138c-0.060-0.098-0.219-0.158-0.457-0.278z" />
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
