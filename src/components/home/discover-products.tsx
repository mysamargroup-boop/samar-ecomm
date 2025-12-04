
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/lib/types';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, getFirestore, limit, orderBy, query, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

function ProductGrid({ products, isLoading }: { products: Product[] | null, isLoading: boolean }) {
    if (isLoading) {
        return (
             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="aspect-square w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                ))}
            </div>
        )
    }

    if (!products || products.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No products found.</p>
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}


export function DiscoverProducts() {
  const { firestore } = useMemoFirebase(() => ({ firestore: getFirestore() }), []);
  
  const newArrivalsQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'products'), orderBy('createdAt', 'desc'), limit(8)) : null,
    [firestore]
  );
  const bestSellersQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'products'), where('salePrice', '!=', null), limit(8)) : null,
    [firestore]
  );
  const topRatedQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'products'), limit(8)) : null, // Placeholder for now
    [firestore]
  );

  const { data: newArrivals, isLoading: isLoadingNew } = useCollection<Product>(newArrivalsQuery);
  const { data: bestSellers, isLoading: isLoadingBest } = useCollection<Product>(bestSellersQuery);
  const { data: topRated, isLoading: isLoadingTop } = useCollection<Product>(topRatedQuery);

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="new-arrivals" className="w-full">
            <div className="flex justify-center mb-8">
                <TabsList>
                    <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
                    <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
                    <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
                </TabsList>
            </div>
          <TabsContent value="new-arrivals">
            <ProductGrid products={newArrivals} isLoading={isLoadingNew} />
          </TabsContent>
          <TabsContent value="best-sellers">
            <ProductGrid products={bestSellers} isLoading={isLoadingBest} />
          </TabsContent>
          <TabsContent value="top-rated">
            <ProductGrid products={topRated} isLoading={isLoadingTop} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
