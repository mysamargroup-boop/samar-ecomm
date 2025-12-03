import { orders } from "@/lib/placeholder-data";
import { CustomerOrderCard } from "@/components/orders/customer-order-card";

export default function AccountOrdersPage() {
  // In a real app, these would be filtered for the current user
  const customerOrders = orders.filter(o => o.customerEmail === 'alice@example.com');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">My Orders</h1>
      
      {customerOrders.length > 0 ? (
         <div className="space-y-6">
            {customerOrders.map(order => (
                <CustomerOrderCard key={order.id} order={order} />
            ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg">
            <h2 className="text-2xl font-semibold">No Orders Found</h2>
            <p className="text-muted-foreground mt-2">You haven't placed any orders with us yet.</p>
        </div>
      )}
    </div>
  );
}
