
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Menu, ShoppingCart, ShoppingBag, User, Heart, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useContext } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { WishlistContext } from '@/contexts/wishlist-context';

export function AppHeader() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { wishlistItems } = useContext(WishlistContext);
  const wishlistCount = wishlistItems.length;
  const cartCount = 2; // Placeholder value

  // Hide header on samar routes
  if (pathname.startsWith('/samar') || pathname.startsWith('/login')) {
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
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  const mobileNav = (
    <div className="flex flex-col h-full p-6">
       <Link href="/" className="mr-6 flex items-center space-x-2 mb-8" onClick={() => setIsSheetOpen(false)}>
        <ShoppingBag className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg font-headline">Samar Store</span>
      </Link>

      <div className="flex-grow overflow-y-auto -mx-6 px-6">
        <nav className="flex flex-col gap-4">
          <div>
            <p className="font-semibold text-sm text-muted-foreground px-4 mb-2">Shop by Category</p>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsSheetOpen(false)} className="px-4 py-2 text-base rounded-md hover:bg-muted">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
             <p className="font-semibold text-sm text-muted-foreground px-4 mb-2">More</p>
             <div className="flex flex-col gap-1">
              {moreLinks.map((link) => (
                 <Link key={link.href} href={link.href} onClick={() => setIsSheetOpen(false)} className="px-4 py-2 text-base rounded-md hover:bg-muted">
                  {link.label}
                </Link>
              ))}
             </div>
          </div>
        </nav>
      </div>

      <SheetFooter className="mt-auto border-t -mx-6 px-6 pt-6 flex-col items-center">
        <nav className="text-center mb-4">
            <span className="text-sm text-muted-foreground">
                <Link href="/returns" className="hover:text-primary transition-colors" onClick={() => setIsSheetOpen(false)}>Return Policy</Link>
                <span className="mx-2">|</span>
                <Link href="/terms" className="hover:text-primary transition-colors" onClick={() => setIsSheetOpen(false)}>Terms & Conditions</Link>
            </span>
        </nav>
        <div className="flex justify-center space-x-2">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} aria-label={social.name}>
              <Button variant="ghost" size="icon">
                <social.icon className="h-5 w-5" />
              </Button>
            </a>
          ))}
        </div>
      </SheetFooter>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm flex flex-col p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation menu.</SheetDescription>
              {mobileNav}
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">Samar Store</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
          {mainNav}
        </nav>

        <div className="flex flex-1 items-center justify-center md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Samar</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
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
