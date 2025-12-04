
'use client';

import { orders as allOrders } from '@/lib/placeholder-data';
import { OrdersTable } from '@/components/orders/orders-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OrdersContent() {
  const searchParams = useSearchParams();
  const customerEmail = searchParams.get('customer');

  const orders = customerEmail
    ? allOrders.filter(order => order.customerEmail === customerEmail)
    : allOrders;

  const title = customerEmail ? `Orders for ${customerEmail}` : 'All Orders';
  const description = customerEmail
    ? `A filtered list of all orders placed by ${customerEmail}.`
    : 'View and manage all customer orders.';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
}


export default function OrdersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrdersContent />
        </Suspense>
    )
}
