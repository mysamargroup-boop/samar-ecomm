'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, ShoppingCart, ShoppingBag, User, Heart } from 'lucide-react';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Badge } from '../ui/badge';

export function AppHeader() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const wishlistCount = 3; // Placeholder value
  const cartCount = 2; // Placeholder value

  // Hide header on admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/samar') || pathname.startsWith('/login')) {
    return null;
  }


  const navLinks = categories.map((category) => ({
    href: `/${category.slug}`,
    label: category.name,
  }));

  const mainNav = (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsSheetOpen(false)}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu.</SheetDescription>
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">Samar Store</span>
              </Link>
              <nav className="flex flex-col space-y-4">{mainNav}</nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">Samar Store</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
            {mainNav}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link href="/wishlist" aria-label="Wishlist" className="relative">
            <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
            </Button>
             {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{wishlistCount}</Badge>
            )}
          </Link>
          <Link href="/cart" aria-label="Shopping Cart" className="relative">
            <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
            </Button>
            {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cartCount}</Badge>
            )}
          </Link>
          <Link href="/account" aria-label="My Account">
            <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">My Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
