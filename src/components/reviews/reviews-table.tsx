
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
import { Badge } from '@/components/ui/badge';
import type { Review } from '@/lib/types';
import { Check, MoreHorizontal, Star, Trash, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function ReviewsTable({ reviews }: { reviews: Review[] }) {
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    console.log(`Approving review ${id}`);
    toast({
      title: 'Review Approved',
      description: `Review ${id} has been published.`,
    });
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
        console.log(`Deleting review ${id}`);
        toast({
            title: 'Review Deleted',
            description: `Review ${id} has been removed.`,
        });
    }
  };

  const getProductName = (productId: string) => {
      return products.find(p => p.id === productId)?.name || 'Unknown Product';
  }

  const statusVariant = (status: Review['status']) => {
    switch (status) {
        case 'Pending': return 'secondary';
        case 'Approved': return 'default';
        default: return 'outline';
    }
  }

  const statusBadgeClass = (status: Review['status']) => {
      if (status === 'Approved') return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      return "";
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="hidden lg:table-cell">Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.authorName}</TableCell>
                <TableCell>{getProductName(review.productId)}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400"/>)}
                        {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-muted-foreground"/>)}
                    </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell max-w-sm truncate">{review.comment}</TableCell>
                <TableCell>
                    <Badge variant={statusVariant(review.status)} className={cn(statusBadgeClass(review.status))}>{review.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {review.status === 'Pending' && (
                        <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                          <Check className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDelete(review.id)} className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
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
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <CardTitle className="text-base">{review.authorName}</CardTitle>
                      <CardDescription>{getProductName(review.productId)}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost" className="-mr-2 -mt-2">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {review.status === 'Pending' && (
                        <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                          <Check className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDelete(review.id)} className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground border-t pt-4">{review.comment}</p>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400"/>)}
                        {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-muted-foreground"/>)}
                    </div>
                    <Badge variant={statusVariant(review.status)} className={cn(statusBadgeClass(review.status))}>{review.status}</Badge>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
