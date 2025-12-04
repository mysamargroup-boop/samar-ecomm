
'use client';

import { products as placeholderProducts, categories, reviews as allReviews } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ProductPageClient } from '@/components/products/product-page-client';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function ProductPageContent({ productId }: { productId: string }) {
  const { firestore } = useMemoFirebase(() => ({ firestore: getFirestore() }), []);
  const productRef = useMemoFirebase(() => firestore ? doc(firestore, 'products', productId) : null, [firestore, productId]);
  const { data: product, isLoading } = useDoc<Product>(productRef);
  
  if (isLoading) {
    return (
       <div className="container mx-auto px-4 py-8 md:py-12">
        <Skeleton className="h-6 w-1/3 mb-8" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoryId);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
  ];
  if (category) {
    breadcrumbItems.push({ label: category.name, href: `/${category.slug}` });
  }
  breadcrumbItems.push({ label: product.name });


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <ProductPageClient product={product} />
    </div>
  );
}


export default function ProductPage({ params }: { params: { productId: string } }) {
  return <ProductPageContent productId={params.productId} />;
}
