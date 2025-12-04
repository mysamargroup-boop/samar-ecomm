
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
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
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {customers.map((customer) => (
            <Card key={customer.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://avatar.vercel.sh/${customer.email}.png`} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-base">{customer.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                    </div>
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
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
                        <div className="space-y-1">
                            <p>Last Order:</p>
                            <p>Total Spent:</p>
                             <p>Orders:</p>
                        </div>
                         <div className="space-y-1 text-right font-medium text-foreground">
                            <p>{customer.lastOrder.toLocaleDateString()}</p>
                            <p>{formatPrice(customer.totalSpent)}</p>
                             <p>{customer.orderCount}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </>
  );
}
