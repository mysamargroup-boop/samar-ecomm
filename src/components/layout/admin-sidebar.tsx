'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  LogOut,
  ShoppingBag,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Boxes },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/admin" className="flex items-center gap-2 font-bold font-headline">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>Samar Store</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary relative',
                isActive ? 'text-primary' : ''
              )}
            >
              <div className={cn(
                'absolute left-[-1rem] h-6 w-1 rounded-r-lg bg-accent opacity-0 transition-opacity',
                'group-hover:opacity-100',
                 isActive && 'opacity-100'
              )}></div>
              <div className="absolute left-[-0.65rem] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
              {isActive && <div className="absolute left-[-0.65rem] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent"></div>}
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto p-4 border-t">
         <Link
            href="/"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted'
            )}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Link>
      </div>
    </aside>
  );
}
