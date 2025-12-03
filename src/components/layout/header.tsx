'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, Waves, User } from 'lucide-react';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-4">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <Waves className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">CommerceWave</span>
              </Link>
              <nav className="flex flex-col space-y-4">{mainNav}</nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:flex items-center space-x-2 mr-6">
            <Waves className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">CommerceWave</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-start">
             <Link href="/" className="flex md:hidden items-center space-x-2">
                <Waves className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">CommerceWave</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
                {mainNav}
            </nav>
        </div>


        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Customer Login</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
