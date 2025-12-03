'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  ListOrdered,
  User,
  Heart,
} from 'lucide-react';


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const navItems = [
    { href: '/account', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/account/orders', label: 'My Orders', icon: ListOrdered },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/account/profile', label: 'My Profile', icon: User },
  ];

  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-12">
            <aside className="md:col-span-1">
                <h2 className="text-2xl font-bold font-headline mb-6">Account Menu</h2>
                <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                        'group flex items-center gap-3 rounded-md px-3 py-2 text-foreground/80 transition-all hover:text-foreground hover:bg-muted',
                        isActive ? 'text-foreground bg-muted font-medium' : ''
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    );
                })}
                 <Link
                    href="/"
                    className={cn(
                      'group flex items-center gap-3 rounded-md px-3 py-2 text-foreground/80 transition-all hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </nav>
            </aside>
            <main className="md:col-span-3">
                {children}
            </main>
        </div>
    </div>
  );
}
