

'use client';

import React from 'react';
import { ArrowRight, ShoppingBag, Twitter, Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { categories, socialLinks as socialLinksData, storeDetails } from '@/lib/placeholder-data';
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
    { name: 'Facebook', icon: Facebook, href: socialLinksData.facebook },
    { name: 'Twitter', icon: Twitter, href: socialLinksData.twitter },
    { name: 'Instagram', icon: Instagram, href: socialLinksData.instagram },
    { name: 'Youtube', icon: Youtube, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: socialLinksData.linkedin },
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

  const SocialLinks = () => (
    <div className="space-y-4">
      <h3 className="font-semibold font-headline">Let's get social</h3>
      <div className="flex -ml-2">
        {socialLinks.map((social) => (
            <a key={social.name} href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
                <social.icon className="h-5 w-5" />
            </Button>
            </a>
        ))}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <a href={`mailto:${storeDetails.email}`} className="flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4"/>
            {storeDetails.email}
        </a>
        <a href={`tel:${storeDetails.phone}`} className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4"/>
            {storeDetails.phone}
        </a>
      </div>
    </div>
  );


  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-5 gap-8">
          <div className="flex flex-col space-y-4 col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">{storeDetails.name}</span>
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
          
          <div className="flex flex-col space-y-6">
            <SocialLinks />
          </div>

        </div>

         {/* Mobile Footer */}
        <div className="md:hidden">
           <div className="flex flex-col items-center text-center space-y-4 col-span-2 mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">{storeDetails.name}</span>
            </Link>
             <h3 className="font-semibold pt-4 font-headline">Subscribe to our email alerts!</h3>
            <div className="relative max-w-sm w-full">
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
             <AccordionItem value="social-links">
                <AccordionTrigger className="font-semibold font-headline text-base py-4">
                  Social
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <SocialLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </div>


        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground space-y-6">
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

            <p>&copy; {new Date().getFullYear()} {storeDetails.name}. All Rights Reserved.</p>
            <p className="text-xs text-muted-foreground/80 max-w-2xl mx-auto">
                For queries contact us: Manager, {storeDetails.name}, {storeDetails.address}
            </p>
        </div>
      </div>
    </footer>
  );
}
