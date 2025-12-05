
'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { CustomerOrderCard } from '@/components/orders/customer-order-card';
import { collection } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function AccountOrdersContent() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const ordersQuery = useMemoFirebase(
    () => (user ? collection(firestore, 'customers', user.uid, 'orders') : null),
    [firestore, user]
  );
  const { data: customerOrders, isLoading: areOrdersLoading } = useCollection<Order>(ordersQuery);
  
  const isLoading = isUserLoading || areOrdersLoading;

  if (isLoading) {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline text-center">My Orders</h1>
            <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-center">My Orders</h1>

      {customerOrders && customerOrders.length > 0 ? (
        <div className="space-y-6">
          {customerOrders.map(order => (
            <CustomerOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg">
          <h2 className="text-2xl font-semibold">No Orders Found</h2>
          <p className="text-muted-foreground mt-2">
            You haven't placed any orders with us yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AccountOrdersPage() {
    return <AccountOrdersContent />;
}

    