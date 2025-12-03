
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { products } from "@/lib/placeholder-data";
import { formatPrice } from "@/lib/utils";

// This would typically be dynamic metadata, but for this example, it's static.
// export const metadata: Metadata = {
//     title: "Checkout",
//     robots: {
//         index: false,
//         follow: false,
//     }
// }

export default function CheckoutPage() {
    // In a real app, this data would come from a cart state management
    const cartItems = [
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 2 },
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 50.00; // Shipping in INR
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
             <head>
                <title>Checkout</title>
                <meta name="robots" content="noindex, nofollow" />
            </head>
            <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="**** **** **** 1234" />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{formatPrice(shipping)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/order-confirmation">Pay & Place Order</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
