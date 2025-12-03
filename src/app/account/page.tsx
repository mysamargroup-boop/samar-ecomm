import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListOrdered, User } from "lucide-react";

export default function AccountPage() {
    // In a real app, you'd get the user's name from their session
    const userName = "Alice";

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">My Account</h1>
            <p className="text-xl text-muted-foreground mb-10">
                Welcome back, {userName}!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <ListOrdered className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>My Orders</CardTitle>
                            <CardDescription>View your order history and track shipments.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Link href="/account/orders">
                            <Button>View Orders</Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <User className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>My Profile</CardTitle>
                            <CardDescription>Manage your personal details and shipping address.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Link href="/account/profile">
                            <Button variant="outline">Edit Profile</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
