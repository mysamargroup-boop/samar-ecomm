'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, User, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892l-.001-.001c-1.996 0-3.956-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 6.045 0 10.939-4.894 10.94-10.938s-4.894-10.939-10.94-10.939c-3.011 0-5.748 1.225-7.738 3.215-1.99 1.99-3.216 4.728-3.215 7.738.001 2.268.622 4.48 1.774 6.388l-1.122 4.095 4.195-1.1zm7.391-7.441c-.227-.114-1.347-.665-1.556-.74s-.361-.114-.515.114c-.153.228-.588.74-.722.887s-.27.171-.504.057c-.234-.114-1.005-.37-1.916-1.192-.712-.625-1.193-1.406-1.332-1.645s-.012-.368.102-.482c.114-.114.254-.29.38-.433s.171-.228.256-.384.043-.285-.014-.399c-.057-.114-.505-1.227-.692-1.677s-.37-.379-.505-.385c-.135-.006-.29-.006-.444-.006s-.399.057-.612.285c-.213.228-.832.813-.832 1.995s.851 2.318.965 2.474c.114.156 1.671 2.59 4.053 3.582.57.235 1.018.375 1.365.486.58.187 1.112.162 1.528.098.463-.068 1.347-.55 1.537-1.082.19-.532.19-1 .133-1.114s-.212-.171-.441-.285z"></path>
    </svg>
);


export function MobileBottomNav() {
  const pathname = usePathname();
  const { wishlistItems } = useWishlist();
  const { cartCount } = useCart();
  const wishlistCount = wishlistItems.length;

  const whatsappLink = "https://wa.me/"; // Replace with your WhatsApp number if needed

  const navItems = [
    { href: '/', label: 'Shop', icon: Home },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, count: wishlistCount },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, count: cartCount },
    { href: whatsappLink, label: 'WhatsApp', icon: WhatsAppIcon, isExternal: true },
    { href: '/account', label: 'Account', icon: User },
  ];

  if (pathname.startsWith('/samar') || pathname.startsWith('/samar') || pathname.startsWith('/login')) {
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
