'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  MapPin,
  Package,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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
        <div className="grid grid-cols-2 gap-4">
            {navItems.map((item) => (
                <Link href={item.href} key={item.label}>
                    <Card className="hover:bg-muted hover:border-primary/50 transition-colors">
                        <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                            <item.icon className="h-8 w-8 text-primary" />
                            <span className="font-medium text-center">{item.label}</span>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}


export default function AccountPage() {
  const { logout } = useAuth();


  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 text-xl">
                        <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">Shubham Nema</h2>
                        <p className="text-muted-foreground">msnema7@gmail.com</p>
                         <p className="text-muted-foreground">+91 8518024107</p>
                    </div>
                </div>
                <Separator className="my-4"/>
                <div className="flex items-center gap-4">
                    <Badge>Home</Badge>
                    <p className="text-sm text-muted-foreground">Subhash Nagar Shastri Ward, Sagar, 470002, Madhya Pradesh</p>
                </div>
            </CardContent>
        </Card>
        
        <AccountNav />
        
        <div className="text-center">
            <Button variant="link" onClick={handleLogout} className="text-destructive hover:text-destructive/80">Logout</Button>
        </div>
    </div>
  );
}
