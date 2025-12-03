
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Menu, ShoppingCart, ShoppingBag, User, Heart, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

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
  
  const moreLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];


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

  const mobileNav = (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsSheetOpen(false)}>
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Samar Store</span>
        </Link>
        <nav className="flex flex-col space-y-4">
          <p className="font-semibold text-sm text-muted-foreground px-2">Shop by Category</p>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsSheetOpen(false)} className="px-2 py-1 text-lg">
              {link.label}
            </Link>
          ))}
          <Separator className="my-4" />
          <p className="font-semibold text-sm text-muted-foreground px-2">More</p>
          {moreLinks.map((link) => (
             <Link key={link.href} href={link.href} onClick={() => setIsSheetOpen(false)} className="px-2 py-1 text-lg">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t -mx-6 px-6 pt-6">
        <nav className="text-center mb-6">
            <span className="text-sm text-muted-foreground">
                <Link href="/returns" className="hover:text-primary transition-colors" onClick={() => setIsSheetOpen(false)}>Return Policy</Link>
                <span className="mx-2">|</span>
                <Link href="/terms" className="hover:text-primary transition-colors" onClick={() => setIsSheetOpen(false)}>Terms & Conditions</Link>
            </span>
        </nav>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} aria-label={social.name}>
              <Button variant="ghost" size="icon">
                <social.icon className="h-5 w-5" />
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
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
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm flex flex-col">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu.</SheetDescription>
                {mobileNav}
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
