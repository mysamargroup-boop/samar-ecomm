import { orders } from "@/lib/placeholder-data";
import { OrdersTable } from "@/components/orders/orders-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountOrdersPage() {
  // In a real app, these would be filtered for the current user
  const customerOrders = orders.slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">My Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            Here are all the orders you've placed with us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={customerOrders} />
        </CardContent>
      </Card>
    </div>
  );
}
