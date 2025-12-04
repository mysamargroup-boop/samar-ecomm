
'use client';

import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/product-card';

type RecentlyViewedProps = {
  products: Product[];
};

export function RecentlyViewed({ products }: RecentlyViewedProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
            Recently Viewed
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showBuyNow={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
