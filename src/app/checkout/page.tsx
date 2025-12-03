
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/placeholder-data";
import { formatPrice } from "@/lib/utils";
import { createPaymentOrder, verifyPaymentSignature } from "@/lib/payment";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// This is a client-side only component to handle the payment button
function PaymentButton({ amount, disabled }: { amount: number, disabled: boolean }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handlePayment() {
    const response = await createPaymentOrder(amount * 100); // Amount in paise

    if (!response.success) {
      toast({
        title: 'Error',
        description: 'Could not create payment order.',
        variant: 'destructive',
      });
      return;
    }

    const { order } = response;
    
    console.log("Simulating payment for order:", order.id);

    const paymentData = {
      orderId: order.id,
      paymentId: `mock_payment_${Date.now()}`,
      signature: 'mock_signature'
    };

    const isValid = await verifyPaymentSignature(paymentData);
    if (isValid) {
      toast({
        title: 'Payment Successful!',
        description: 'Your order has been placed.',
      });
      router.push('/order-confirmation');
    } else {
      toast({
        title: 'Payment Failed',
        description: 'Signature verification failed. Please contact support.',
        variant: 'destructive',
      });
    }
  }
  return (
    <Button className="w-full" size="lg" onClick={handlePayment} disabled={disabled}>
      Pay & Place Order
    </Button>
  )
}

export default function CheckoutPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // In a real app, this data would come from a cart state management
    const cartItems = [
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 2 },
    ];

    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.product.salePrice ?? item.product.price;
        return acc + price * item.quantity;
    }, 0);
    const shipping = 50.00;
    const total = subtotal + shipping;


    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
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
                           <p className="text-sm text-muted-foreground">You will be redirected to our secure payment partner page to complete the transaction.</p>
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
                    {isClient ? <PaymentButton amount={total} disabled={cartItems.length === 0} /> : <div className="h-11 w-full rounded-md bg-muted animate-pulse" />}
                </div>
            </div>
        </div>
    );
}
