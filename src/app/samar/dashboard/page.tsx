

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SalesAnalyticsChart } from '@/components/samar/dashboard/sales-analytics-chart';
import { RecentSales } from '@/components/samar/dashboard/recent-sales';
import { orders } from '@/lib/placeholder-data';
import { formatPrice } from '@/lib/utils';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

export default function DashboardPage() {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalSales = orders.length;
  const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;
  const recentSales = orders.slice(0, 5);

  const stats = [
    { title: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, change: '+20.1% from last month' },
    { title: 'Customers', value: `+${uniqueCustomers}`, icon: Users, change: '+180.1% from last month' },
    { title: 'Sales', value: `+${totalSales}`, icon: CreditCard, change: '+19% from last month' },
    { title: 'Active Now', value: '+573', icon: Activity, change: '+201 since last hour' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>An overview of your store's performance.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesAnalyticsChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made {orders.length} sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales sales={recentSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
