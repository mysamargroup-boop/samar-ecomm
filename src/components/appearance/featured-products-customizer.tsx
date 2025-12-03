
'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

type FeaturedProductsCustomizerProps = {
  allProducts: Product[];
  featuredProductIds: string[];
};

export function FeaturedProductsCustomizer({
  allProducts,
  featuredProductIds,
}: FeaturedProductsCustomizerProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    new Set(featuredProductIds)
  );

  const handleCheckboxChange = (productId: string, checked: boolean) => {
    setSelectedProductIds(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Featured</TableHead>
              <TableHead>Product</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProductIds.has(product.id)}
                    onCheckedChange={(checked) => handleCheckboxChange(product.id, !!checked)}
                    aria-label={`Feature ${product.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <div className="font-medium">{product.name}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
