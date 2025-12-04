
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ChevronRight,
  HelpCircle,
  Mail,
  FileText,
  LogOut,
  Bell,
  Headset,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function AccountPage() {
  const { logout } = useAuth();

  const navItems = [
    {
      href: '/notifications',
      label: 'Notification Center',
      icon: Bell,
    },
    {
      href: '/contact',
      label: 'Help and Support',
      icon: Headset,
    },
    { href: '/faq', label: 'FAQs', icon: HelpCircle },
    {
      href: '/terms',
      label: 'Terms & conditions',
      icon: FileText,
    },
    { href: '/contact', label: 'Get in touch', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">More</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between p-4 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
           <button
            onClick={handleLogout}
            className="flex items-center justify-between p-4 hover:bg-muted transition-colors w-full text-left"
          >
            <div className="flex items-center gap-4">
               <LogOut className="h-5 w-5 text-destructive" />
              <span className="font-medium text-destructive">Logout</span>
            </div>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
