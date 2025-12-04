'use client';

import { ArrowRight, ShoppingBag, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { Input } from '../ui/input';

export function Footer() {
  const pathname = usePathname();

  // Hide footer on samar routes
  if (pathname.startsWith('/samar') || pathname.startsWith('/login')) {
    return null;
  }

  const supportLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const legalLinks = [
     { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Shipping Information', href: '/shipping' },
  ]

  const shopLinks = categories.map((category) => ({
    name: category.name,
    href: `/${category.slug}`,
  }));

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="flex flex-col space-y-4 col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">Samar Store</span>
            </Link>
             <h3 className="font-semibold pt-4 font-headline">Subscribe to our email alerts!</h3>
            <div className="relative max-w-sm">
                <Input placeholder="Enter your email address" className="pr-10 h-11"/>
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9">
                    <ArrowRight className="h-5 w-5"/>
                </Button>
            </div>
             <div className="flex space-x-2 pt-2">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} aria-label={social.name}>
                  <Button variant="ghost" size="icon">
                    <social.icon className="h-5 w-5" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-headline">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-headline">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-headline">Legal</h3>
            <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.name}
                      </Link>
                  </li>
                ))}
            </ul>
          </div>

        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Samar Store. All rights reserved.</p>
          <p>Designed by Samar</p>
        </div>
      </div>
    </footer>
  );
}
