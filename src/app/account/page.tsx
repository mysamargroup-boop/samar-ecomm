
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
  MapPin,
  Package,
  User as UserIcon,
  Bell,
  Headphones,
  CircleHelp,
  FileText,
  Mail,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AccountNav() {
    const navItems = [
        {
            href: '/account/profile',
            label: 'Manage Address',
            icon: MapPin,
        },
        {
            href: '/account/orders',
            label: 'My Orders',
            icon: Package,
        },
    ];

    return (
        <Card>
            <CardContent className="p-2">
                 <div className="grid grid-cols-2 gap-2">
                    {navItems.map((item) => (
                        <Link href={item.href} key={item.label}>
                            <div className="hover:bg-muted hover:border-primary/50 transition-colors p-4 rounded-md">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <item.icon className="h-8 w-8 text-primary" />
                                    <span className="font-medium text-center">{item.label}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function MoreNav() {
    const navItems = [
        { href: '#', label: 'Notification Center', icon: Bell },
        { href: '#', label: 'Help and Support', icon: Headphones },
        { href: '/faq', label: 'FAQs', icon: CircleHelp },
        { href: '/terms', label: 'Terms & conditions', icon: FileText },
        { href: '/contact', label: 'Get in touch', icon: Mail },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">More</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="divide-y">
                    {navItems.map(item => (
                        <li key={item.label}>
                           <Link href={item.href}>
                                <div className="flex items-center p-4 hover:bg-muted transition-colors">
                                    <item.icon className="h-5 w-5 mr-4 text-muted-foreground" />
                                    <span className="flex-1">{item.label}</span>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                           </Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}


export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p>Loading...</p>
        </div>
    );
  }

  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 text-xl">
                        <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">Welcome!</h2>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <AccountNav />

        <MoreNav />
        
        <Card className="overflow-hidden">
            <Button variant="ghost" onClick={logout} className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-none justify-start px-4 py-6 text-base">
                <LogOut className="mr-4 h-5 w-5" />
                Logout
            </Button>
        </Card>
    </div>
  );
}
