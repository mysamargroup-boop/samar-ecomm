import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Confirmation",
    robots: {
        index: false,
        follow: false,
    }
}

export default function OrderConfirmationPage() {
    return (
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full p-3 w-fit">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Thank You For Your Order!</CardTitle>
                    <CardDescription>
                        Your order #12345 has been placed successfully. A confirmation email has been sent to you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        You can view your order details in your account or track the shipment once it's on its way.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/">
                            <Button>Continue Shopping</Button>
                        </Link>
                         <Link href="/account/orders">
                            <Button variant="outline">View My Orders</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
