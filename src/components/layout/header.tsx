'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, Waves } from 'lucide-react';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

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
        <div className="mr-6 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Waves className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">CommerceWave</span>
          </Link>
        </div>
        
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <Waves className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">CommerceWave</span>
                </Link>
                <nav className="flex flex-col space-y-4">{mainNav}</nav>
                </SheetContent>
            </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-start">
            <nav className="hidden md:flex items-center space-x-6">{mainNav}</nav>
        </div>

        <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
                <Waves className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">CommerceWave</span>
            </Link>
            <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
            </Link>
            </Button>
            <Button asChild>
            <Link href="/login">Admin Login</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
