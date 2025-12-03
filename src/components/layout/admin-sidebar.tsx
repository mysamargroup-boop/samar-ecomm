
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
  Menu,
  Tags,
  Users,
  Settings,
  Palette,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Boxes },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/appearance', label: 'Appearance', icon: Palette },
  { href: '/admin/tags', label: 'Tags', icon: Tags },
];

const secondaryNavItems = [
    { href: '/admin/settings', label: 'Settings', icon: Settings },
]

function SidebarNavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  const renderLink = (item: typeof navItems[0]) => {
    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onLinkClick}
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary relative',
          isActive ? 'text-primary bg-muted' : ''
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.label}
      </Link>
    )
  }
  return (
     <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map(renderLink)}
        <div className="py-2">
            <div className="h-px bg-border -mx-4"></div>
        </div>
        {secondaryNavItems.map(renderLink)}
      </nav>
  )
}

export function AdminSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/admin" className="flex items-center gap-2 font-bold font-headline">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>Samar Store</span>
        </Link>
      </div>
      <SidebarNavLinks />
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

export function AdminMobileHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="flex md:hidden items-center h-16 px-4 border-b shrink-0 bg-card">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col w-full max-w-xs sm:max-w-sm p-0">
           <div className="h-16 flex items-center px-6 border-b">
            <Link href="/admin" className="flex items-center gap-2 font-bold font-headline" onClick={() => setIsSheetOpen(false)}>
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span>Samar Store</span>
            </Link>
          </div>
          <SidebarNavLinks onLinkClick={() => setIsSheetOpen(false)} />
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
        </SheetContent>
      </Sheet>
       <div className="flex-1 text-center">
         <Link href="/admin" className="flex items-center gap-2 font-bold font-headline text-lg justify-center">
            <span>Admin</span>
          </Link>
       </div>
    </header>
  )
}
