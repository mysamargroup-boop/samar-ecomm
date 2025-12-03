import { Waves, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Footer() {
  const footerLinks = [
    { name: 'Terms and Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Shipping Information', href: '/shipping' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">CommerceWave</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The future of e-commerce, delivered to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
             <div>
                <h3 className="font-semibold mb-4 font-headline">Quick Links</h3>
                <ul className="space-y-2">
                    {footerLinks.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Follow Us</h3>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CommerceWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
