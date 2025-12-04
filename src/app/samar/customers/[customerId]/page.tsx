
import { customers } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CustomerDetailsPage({ params }: { params: { customerId: string } }) {
  const customer = customers.find(c => c.id === params.customerId);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/samar/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Customer Details</h1>
      </div>
      
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                 <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://avatar.vercel.sh/${customer.email}.png`} alt={customer.name} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{customer.name}</CardTitle>
                    <CardDescription>{customer.email}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold">{formatPrice(customer.totalSpent)}</p>
                </div>
                 <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Orders</p>
                    <p className="text-2xl font-bold">{customer.orderCount}</p>
                </div>
                 <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Last Order</p>
                    <p className="text-2xl font-bold">{customer.lastOrder.toLocaleDateString()}</p>
                </div>
            </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            A list of recent orders from {customer.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Order history table will be displayed here.</p>
        </CardContent>
      </Card>

    </div>
  );
}
