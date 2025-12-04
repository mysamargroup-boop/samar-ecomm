'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/lib/types';
import { products } from '@/lib/placeholder-data';

function ProductGrid({ products }: { products: Product[] }) {
    if (!products || products.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No products found.</p>
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}


export function DiscoverProducts() {
  const newArrivals = products.slice(0, 8);
  const bestSellers = products.slice(2, 10);
  const topRated = products.slice(4, 12);

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
                Discover Your Next Favorite
            </h2>
        </div>
        <Tabs defaultValue="new-arrivals" className="w-full">
            <div className="flex justify-center mb-8">
                <TabsList className="bg-transparent p-0 gap-2">
                    <TabsTrigger value="new-arrivals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full border border-border data-[state=active]:border-primary transition-all duration-300">New Arrivals</TabsTrigger>
                    <TabsTrigger value="best-sellers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full border border-border data-[state=active]:border-primary transition-all duration-300">Best Sellers</TabsTrigger>
                    <TabsTrigger value="top-rated" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full border border-border data-[state=active]:border-primary transition-all duration-300">Top Rated</TabsTrigger>
                </TabsList>
            </div>
          <TabsContent value="new-arrivals">
            <ProductGrid products={newArrivals} />
          </TabsContent>
          <TabsContent value="best-sellers">
            <ProductGrid products={bestSellers} />
          </TabsContent>
          <TabsContent value="top-rated">
            <ProductGrid products={topRated} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
