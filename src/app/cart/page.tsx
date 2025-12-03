import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/placeholder-data";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart",
    robots: {
        index: false,
        follow: false,
    }
}

export default function CartPage() {
    const cartItems = [
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 2 },
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold font-headline mb-8">Your Shopping Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="p-0">
                            <ul className="divide-y">
                                {cartItems.map(item => (
                                    <li key={item.product.id} className="flex items-center gap-4 p-4">
                                        <Image src={item.product.images[0]} alt={item.product.name} width={80} height={80} className="rounded-md object-cover" data-ai-hint="product image"/>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div>
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
                        <CardFooter>
                            <Button className="w-full" asChild size="lg">
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
