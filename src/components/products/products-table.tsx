
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
import type { Product } from '@/lib/types';
import { categories } from '@/lib/placeholder-data';
import { formatPrice } from '@/lib/utils';
import { MoreHorizontal, Pen, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteProduct } from '@/app/actions/productActions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ProductsTable({ products }: { products: Product[] }) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(id);
      toast({
        title: 'Product Deleted',
        description: result.message,
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    alt={product.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.images[0] || '/placeholder.svg'}
                    width="64"
                    data-ai-hint="product image"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {getCategoryName(product.categoryId)}
                  </Badge>
                </TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/samar/products/${product.slug}/edit`}>
                          <Pen className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                 <Image
                    alt={product.name}
                    className="rounded-t-lg object-cover"
                    src={product.images[0] || '/placeholder.svg'}
                    fill
                    data-ai-hint="product image"
                  />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                <div className="flex justify-between items-center text-sm">
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    <Badge variant="outline">{product.inventory} in stock</Badge>
                </div>
                 <div className="flex items-center justify-between pt-2 border-t">
                    <Badge variant="secondary" className="whitespace-nowrap text-xs">
                        {getCategoryName(product.categoryId)}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/samar/products/${product.slug}/edit`}>
                              <Pen className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
