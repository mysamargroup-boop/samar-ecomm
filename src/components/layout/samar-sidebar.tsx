
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Send,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';
import { ThemeToggle } from '../ui/theme-toggle';

const SAMAR_AUTH_KEY = 'samar-auth';

const navItems = [
  { href: '/samar/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/samar/products', label: 'Products', icon: Package },
  { href: '/samar/categories', label: 'Categories', icon: Boxes },
  { href: '/samar/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/samar/customers', label: 'Customers', icon: Users },
  { href: '/samar/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/samar/blog', label: 'Blog', icon: Newspaper },
  { href: '/samar/appearance', label: 'Appearance', icon: Palette },
  { href: '/samar/tags', label: 'Tags', icon: Tags },
  { href: '/samar/whatsapp', label: 'WhatsApp', icon: Send },
];

const secondaryNavItems = [
    { href: '/samar/settings', label: 'Settings', icon: Settings },
]

function SidebarNavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  const renderLink = (item: typeof navItems[0]) => {
    const isActive = pathname === item.href || (item.href !== '/samar/dashboard' && pathname.startsWith(item.href));
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onLinkClick}
        className={cn(
          'group flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent',
          isActive ? 'text-sidebar-foreground bg-sidebar-accent font-medium' : ''
        )}
      >
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

export function SamarSidebar() {
    const router = useRouter();
    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        sessionStorage.removeItem(SAMAR_AUTH_KEY);
        router.push('/samar');
    };

  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar border-r hidden md:flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-sidebar-border">
        <Link href="/samar" className="flex items-center gap-2 font-bold font-headline text-sidebar-foreground">
          <ShoppingBag className="h-6 w-6 text-sidebar-primary" />
          <span>Samar Store</span>
        </Link>
      </div>
      <SidebarNavLinks />
      <div className="mt-auto p-2 border-t border-sidebar-border flex items-center justify-between">
         <button
            onClick={handleLogout}
            className={cn(
              'flex-1 flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
          <ThemeToggle />
      </div>
    </aside>
  );
}

export function SamarMobileHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem(SAMAR_AUTH_KEY);
    setIsSheetOpen(false);
    router.push('/samar');
  };


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
           <div className="flex items-center px-6 py-5 border-b border-sidebar-border">
            <Link href="/samar" className="flex items-center gap-2 font-bold font-headline" onClick={() => setIsSheetOpen(false)}>
              <ShoppingBag className="h-6 w-6 text-sidebar-primary" />
              <span>Samar Store</span>
            </Link>
          </div>
          <SidebarNavLinks onLinkClick={() => setIsSheetOpen(false)} />
           <div className="mt-auto p-2 border-t border-sidebar-border">
             <button
                onClick={handleLogout}
                className={cn(
                  'w-full flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
          </div>
        </SheetContent>
      </Sheet>
       <div className="flex-1 text-center">
         <Link href="/samar" className="flex items-center gap-2 font-bold font-headline text-lg justify-center">
            <span>Samar</span>
          </Link>
       </div>
       <div className="w-8">
        <ThemeToggle />
       </div>
    </header>
  )
}
