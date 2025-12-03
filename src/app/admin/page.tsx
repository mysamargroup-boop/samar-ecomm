
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag } from 'lucide-react';
import { SalesAnalyticsChart } from '@/components/admin/dashboard/sales-analytics-chart';
import { RecentSales } from '@/components/admin/dashboard/recent-sales';
import { orders, products } from '@/lib/placeholder-data';
import { formatPrice } from '@/lib/utils';
import { IndianRupee, Package, ShoppingCart as ShoppingCartIcon, Users } from 'lucide-react';

const isDemoMode = !process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;


export default function SamarPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = formData.get('phone');

    if (isDemoMode) {
      console.log("Running in Demo Mode. Redirecting to verification page.");
      router.push(`/samar/verify?phone=${phone}`);
    } else {
      console.log("Running in Live Mode. (API call to be implemented)");
      router.push(`/samar/verify?phone=${phone}`);
    }
  };
  
    const stats = [
    { title: 'Total Revenue', value: formatPrice(4523189), icon: IndianRupee, change: '+20.1% from last month' },
    { title: 'Total Sales', value: '+12,234', icon: ShoppingCartIcon, change: '+19% from last month' },
    { title: 'Active Products', value: '235', icon: Package, change: 'Total products in store' },
    { title: 'New Customers', value: '+573', icon: Users, change: '+201 since last hour' },
  ];

  const recentSales = orders.slice(0, 5);


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                 <CardDescription>An overview of your store's sales performance.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <SalesAnalyticsChart />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                 <CardDescription>Your 5 most recent sales.</CardDescription>
            </CardHeader>
            <CardContent>
                <RecentSales sales={recentSales}/>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
