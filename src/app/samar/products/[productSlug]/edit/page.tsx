
'use client';
import { ProductForm } from '@/components/products/product-form';
import { categories, products as placeholderProducts } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function EditProductForm({ productSlug }: { productSlug: string }) {
  const product = placeholderProducts.find(p => p.slug === productSlug);

  // Note: This component is not using live Firestore data for the product.
  // For demo purposes, we'll simulate a loading state
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline text-center md:text-left">Edit Product</h1>
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-1/2" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    notFound();
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">Edit Product</h1>
       <Card>
        <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Update the details for "{product.name}".</CardDescription>
        </CardHeader>
        <CardContent>
           <ProductForm product={product} categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}


export default function EditProductPage({ params }: { params: { productSlug: string } }) {
  return <EditProductForm productSlug={params.productSlug} />;
}
