
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListOrdered, User, Heart, LogOut } from "lucide-react";

export default function AccountPage() {
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {navItems.map((item) => (
                    <Card key={item.href} className="text-center flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
                        <CardHeader className="p-0 mb-4">
                            <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                                <item.icon className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                             <Link href={item.href} passHref>
                                <Button variant="link" className="text-lg font-semibold">
                                    {item.label}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="text-center flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0 mb-4">
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                            <LogOut className="h-8 w-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Link href="/" passHref>
                            <Button variant="link" className="text-lg font-semibold">
                                Logout
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
