
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
  Newspaper,
  MessageSquare,
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
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
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
          'group flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent relative',
          isActive ? 'text-sidebar-foreground bg-sidebar-accent font-medium' : ''
        )}
      >
        <div className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-maroon rounded-r-full transition-all duration-200",
          isActive ? "h-5" : "group-hover:h-3"
        )}></div>
        <item.icon className="h-4 w-4" />
        {item.label}
      </Link>
    )
  }
  return (
     <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(renderLink)}
        <div className="py-2">
            <div className="h-px bg-sidebar-border -mx-2"></div>
        </div>
        {secondaryNavItems.map(renderLink)}
      </nav>
  )
}

export function AdminSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar border-r hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2 font-bold font-headline text-sidebar-foreground">
          <ShoppingBag className="h-6 w-6 text-sidebar-primary" />
          <span>Samar Store</span>
        </Link>
      </div>
      <SidebarNavLinks />
      <div className="mt-auto p-2 border-t border-sidebar-border">
         <Link
            href="/"
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent'
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
        <SheetContent side="left" className="flex flex-col w-full max-w-xs sm:max-w-sm p-0 bg-sidebar text-sidebar-foreground">
           <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
            <Link href="/admin" className="flex items-center gap-2 font-bold font-headline" onClick={() => setIsSheetOpen(false)}>
              <ShoppingBag className="h-6 w-6 text-sidebar-primary" />
              <span>Samar Store</span>
            </Link>
          </div>
          <SidebarNavLinks onLinkClick={() => setIsSheetOpen(false)} />
           <div className="mt-auto p-2 border-t border-sidebar-border">
             <Link
                href="/"
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent'
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
       <div className="w-8"></div>
    </header>
  )
}
