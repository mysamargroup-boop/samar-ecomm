

'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Customer = {
    id: string;
    name: string;
    email: string;
    totalSpent: number;
    orderCount: number;
    lastOrder: Date;
}

export function CustomersTable({ customers }: { customers: Customer[] }) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Last Order</TableHead>
          <TableHead className="text-right">Orders</TableHead>
          <TableHead className="text-right">Total Spent</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${customer.email}.png`} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                        <p>{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>{customer.lastOrder.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{customer.orderCount}</TableCell>
            <TableCell className="text-right">{formatPrice(customer.totalSpent)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>View Orders</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
