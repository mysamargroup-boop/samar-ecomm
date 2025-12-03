
import { orders } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { OrderDetails } from "@/components/orders/order-details";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const order = orders.find(o => o.id === params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/admin/orders">
                  <>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Orders</span>
                  </>
                </Link>
            </Button>
            <h1 className="text-2xl font-bold font-headline">Order #{order.id.split('_')[1]}</h1>
        </div>
      <OrderDetails order={order} />
    </div>
  );
}
