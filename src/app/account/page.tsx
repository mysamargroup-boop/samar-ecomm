
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListOrdered, User, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function AccountPage() {
    const { logout } = useAuth();
    const userName = "Alice";

    const navItems = [
      { href: '/account/orders', label: 'My Orders', icon: ListOrdered },
      { href: '/account/profile', label: 'My Profile', icon: User },
      { href: '/wishlist', label: 'Wishlist', icon: Heart },
    ];

    return (
        <div className="space-y-10">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-headline">Welcome, {userName}!</h1>
                <p className="text-xl text-muted-foreground mt-2">
                    Manage your orders, profile, and more.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {navItems.map((item) => (
                    <Card key={item.href} className="text-center group hover:shadow-lg transition-shadow">
                        <Link href={item.href} className="block p-6">
                            <CardHeader className="p-0 mb-4">
                                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <item.icon className="h-8 w-8" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <span className="text-lg font-semibold">{item.label}</span>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
                 <Card className="text-center group hover:shadow-lg transition-shadow">
                    <div className="block w-full p-6 text-center">
                        <CardHeader className="p-0 mb-4">
                            <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <LogOut className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                           <Button variant="link" onClick={logout} className="text-lg font-semibold text-foreground hover:no-underline">
                                Logout
                            </Button>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    );
}
