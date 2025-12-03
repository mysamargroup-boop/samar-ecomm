import { Waves, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { categories } from '@/lib/placeholder-data';

export function Footer() {
  const supportLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Shipping Information', href: '/shipping' },
  ];

  const shopLinks = categories.map((category) => ({
    name: category.name,
    href: `/${category.slug}`,
  }));

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4 col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">CommerceWave</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The future of e-commerce, delivered to your doorstep.
            </p>
             <div className="flex space-x-2 pt-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
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
                <li>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        Terms & Conditions
                    </Link>
                </li>
                <li>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                </li>
            </ul>
          </div>

        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CommerceWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
