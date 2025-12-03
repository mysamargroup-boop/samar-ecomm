
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';

export function OrdersTable({ orders }: { orders: Order[] }) {
  const { toast } = useToast();
  const router = useRouter();

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

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
        case 'Shipped': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        case 'Cancelled': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
        default: return 'secondary';
    }
  }


  const handleRowClick = (orderId: string) => {
    router.push(`/samar/orders/${orderId}`);
  };


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
          <TableRow key={order.id} onClick={() => handleRowClick(order.id)} className="cursor-pointer">
            <TableCell className="font-medium">#{order.id.split('_')[1]}</TableCell>
            <TableCell>
              <div>{order.customerName}</div>
              <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
            </TableCell>
            <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="hidden md:table-cell">{formatPrice(order.total)}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <Select defaultValue={order.status} onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}>
                <SelectTrigger className={cn("w-32", getStatusVariant(order.status))}>
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
