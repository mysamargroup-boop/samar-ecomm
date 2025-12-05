
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPaymentOrder, verifyPaymentSignature } from "@/lib/payment";
import { useRouter } from "next/navigation";

function CartPaymentButton({ amount, disabled }: { amount: number, disabled: boolean }) {
  const { toast } = useToast();
  const router = useRouter();
  const { clearCart } = useCart();

  async function handlePayment() {
    const response = await createPaymentOrder(amount * 100);

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
      clearCart();
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
      Proceed to Checkout
    </Button>
  )
}


export default function CartPage() {
    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
    
    const shipping = cartTotal > 0 ? 50.00 : 0;
    const total = cartTotal + shipping;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold font-headline mb-8">Your Shopping Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="p-0">
                             {cartItems.length > 0 ? (
                                <ul className="divide-y">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="flex items-center gap-4 p-4">
                                            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover" data-ai-hint="product image"/>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Input 
                                                    type="number" 
                                                    value={item.quantity} 
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    className="w-16 h-9"
                                                    min="1"
                                                />
                                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                                </Button>
                                            </div>
                                            <p className="font-semibold w-20 text-right">{formatPrice(item.price * item.quantity)}</p>
                                        </li>
                                    ))}
                                </ul>
                             ) : (
                                <p className="p-8 text-center text-muted-foreground">Your cart is empty.</p>
                             )}
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
                                <span>{formatPrice(cartTotal)}</span>
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
                           <CartPaymentButton amount={total} disabled={cartItems.length === 0} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
