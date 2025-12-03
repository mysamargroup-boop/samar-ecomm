'use client';

import { useContext } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { WishlistContext } from '@/contexts/wishlist-context';

// export const metadata: Metadata = {
//     title: 'My Wishlist | Samar Store',
//     description: 'Your saved items and wishlist.',
//     robots: {
//         index: false,
//         follow: false,
//     }
// }

export default function WishlistPage() {
  const { wishlistItems } = useContext(WishlistContext);
  const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          My Wishlist
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          Your favorite items, saved for later.
        </p>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg">
          <h2 className="text-2xl font-semibold">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
