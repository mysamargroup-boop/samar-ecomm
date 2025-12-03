
'use client';

import type { Order } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { products } from "@/lib/placeholder-data";
import { Button } from "../ui/button";

function OrderTimeline({ order }: { order: Order }) {
    const timelineEvents = [
        { status: 'Pending', date: order.createdAt },
        order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? { status: 'Processing', date: new Date(order.createdAt.getTime() + 3600000) } : null,
        order.status === 'Shipped' || order.status === 'Delivered' ? { status: 'Shipped', date: new Date(order.createdAt.getTime() + 86400000) } : null,
        order.status === 'Delivered' ? { status: 'Delivered', date: new Date(order.createdAt.getTime() + 3 * 86400000) } : null,
    ].filter(Boolean);

    return (
        <div className="space-y-4">
            {timelineEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-muted'}`}></div>
                        {index < timelineEvents.length - 1 && <div className="w-px h-full bg-muted"></div>}
                    </div>
                    <div>
                        <p className="font-medium">{event!.status}</p>
                        <p className="text-sm text-muted-foreground">{event!.date.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <li key={item.id} className="flex items-center gap-4 py-4">
                    <Image
                      src={product?.images[0] || ''}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint="product image"
                    />
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
           <CardFooter className="flex justify-end gap-4 bg-muted/50 p-6">
            <div className="space-y-2 text-right">
                <p className="text-muted-foreground">Subtotal <span className="font-semibold text-foreground ml-4">{formatPrice(order.total)}</span></p>
                <p className="text-muted-foreground">Shipping <span className="font-semibold text-foreground ml-4">{formatPrice(0)}</span></p>
                <p className="text-lg font-bold">Total <span className="text-primary ml-4">{formatPrice(order.total)}</span></p>
            </div>
           </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{order.customerName}</p>
            <a href={`mailto:${order.customerEmail}`} className="text-sm text-primary hover:underline">
              {order.customerEmail}
            </a>
            <Separator className="my-4"/>
            <h4 className="font-medium mb-2">Shipping Address</h4>
            <p className="text-sm text-muted-foreground">123 Commerce Lane, Shopsville, IN 12345</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Customer History</Button>
          </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <OrderTimeline order={order} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
