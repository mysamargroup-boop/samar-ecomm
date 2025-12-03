
'use client';

import type { Order } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { products } from "@/lib/placeholder-data";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

export function CustomerOrderCard({ order }: { order: Order }) {
  
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
        case 'Shipped': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        case 'Cancelled': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
        default: return 'secondary';
    }
  }

  return (
    <Card>
        <CardHeader className="flex-row justify-between items-center">
            <div className="space-y-1">
                <CardTitle className="text-lg">Order #{order.id.split('_')[1]}</CardTitle>
                <CardDescription>Placed on {order.createdAt.toLocaleDateString()}</CardDescription>
            </div>
            <div className="text-right">
                <Badge variant="outline" className={cn("text-sm", getStatusVariant(order.status))}>{order.status}</Badge>
            </div>
        </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {order.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return (
              <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                 {product && (
                     <Image
                        src={product.images[0]}
                        alt={item.productName}
                        width={64}
                        height={64}
                        className="rounded-md object-cover border"
                        data-ai-hint="product image"
                    />
                 )}
                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} x {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
       <CardFooter className="flex justify-between items-center bg-muted/50 p-6">
        <div>
            <Link href={`/admin/orders/${order.id}`}>
                <Button variant="outline">View Details</Button>
            </Link>
        </div>
        <div className="text-right">
            <p className="text-lg font-bold">Total: <span className="text-primary ml-2">{formatPrice(order.total)}</span></p>
        </div>
       </CardFooter>
    </Card>
  );
}
