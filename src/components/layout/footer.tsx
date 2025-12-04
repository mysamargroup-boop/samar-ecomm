
'use client';

import React from 'react';
import { ArrowRight, ShoppingBag, Twitter, Facebook, Instagram, Linkedin, Youtube, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { categories } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

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
    { name: 'Youtube', icon: Youtube, href: '#'},
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  const secondaryLegalLinks = [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Warranty Policy', href: '#' },
      { name: 'D2D Paid Repair Service Policy', href: '#' },
  ]
  
  const linkSections = [
    { title: 'Shop', links: shopLinks },
    { title: 'Support', links: supportLinks },
    { title: 'Legal', links: legalLinks },
  ];


  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-5 gap-8">
          <div className="flex flex-col space-y-4 col-span-2">
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

         {/* Mobile Footer */}
        <div className="md:hidden">
           <div className="flex flex-col space-y-4 col-span-2 mb-8">
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
          </div>

           <Accordion type="multiple" className="w-full">
            {linkSections.map((section) => (
                <AccordionItem key={section.title} value={section.title}>
                <AccordionTrigger className="font-semibold font-headline text-base py-4">
                    {section.title}
                </AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-3 pl-1">
                    {section.links.map((link) => (
                        <li key={link.name}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </div>


        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground space-y-6">
            <div className="flex items-center justify-center gap-4">
                <p className="font-medium">Let's get social</p>
                <div className="flex space-x-1">
                {socialLinks.map((social) => (
                    <a key={social.name} href={social.href} aria-label={social.name}>
                    <Button variant="ghost" size="icon">
                        <social.icon className="h-5 w-5" />
                    </Button>
                    </a>
                ))}
                </div>
            </div>

             <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
                {secondaryLegalLinks.map((link, index) => (
                    <React.Fragment key={link.name}>
                        <Link href={link.href} className="hover:text-primary transition-colors text-xs">
                            {link.name}
                        </Link>
                        {index < secondaryLegalLinks.length - 1 && <span className="text-muted-foreground/50">•</span>}
                    </React.Fragment>
                ))}
            </div>

            <p>&copy; {new Date().getFullYear()} Samar Store. All Rights Reserved.</p>
            <p className="text-xs text-muted-foreground/80 max-w-2xl mx-auto">
                For queries contact us: Manager, Samar Store, Unit no. 204 & 205, 2nd floor, D-wing & E-wing, Corporate Avenue, Andheri Ghatkopar Link Road, Mumbai, Maharashtra-400093, India
            </p>
        </div>
      </div>
    </footer>
  );
}
