'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateOrderStatus } from '@/app/actions/orderActions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function OrdersTable({ orders }: { orders: Order[] }) {
  const { toast } = useToast();

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    const result = await updateOrderStatus(orderId, status);
    if (result.message) {
      toast({
        title: 'Status Updated',
        description: result.message,
      });
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const statusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Pending': return 'default';
        case 'Processing': return 'secondary';
        case 'Shipped': return 'default';
        case 'Delivered': return 'default';
        case 'Cancelled': return 'destructive';
        default: return 'outline';
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="hidden md:table-cell">Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">#{order.id.split('_')[1]}</TableCell>
            <TableCell>
              <div>{order.customerName}</div>
              <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
            </TableCell>
            <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="hidden md:table-cell">{formatPrice(order.total)}</TableCell>
            <TableCell>
              <Select defaultValue={order.status} onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}>
                <SelectTrigger className={cn(
                    "w-32",
                    order.status === 'Delivered' && 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700',
                    order.status === 'Shipped' && 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700',
                    order.status === 'Cancelled' && 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700',
                )}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as Order['status'][]).map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
