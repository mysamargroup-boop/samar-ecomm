
'use client';

import { ProductCard } from '@/components/products/product-card';
import type { Category, Product } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { categories, placeholderProducts } from '@/lib/placeholder-data';

function CategoryPageContent({ category }: { category: Category }) {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder for fetching products from Supabase
    setIsLoading(true);
    const products = placeholderProducts.filter(p => p.categoryId === category.id);
    setCategoryProducts(products);
    setIsLoading(false);
  }, [category.id]);


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          {category.name}
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          Explore our collection of top-rated {category.name.toLowerCase()}.
        </p>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
            ))}
        </div>
      ) : categoryProducts && categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
          <p className="text-muted-foreground mt-2">
            There are currently no products in the {category.name} category.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder for fetching category from Supabase
    setLoading(true);
    const foundCategory = categories.find(c => c.slug === params.categorySlug);
    if (foundCategory) {
      setCategory(foundCategory);
    } else {
      notFound();
    }
    setLoading(false);
  }, [params.categorySlug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-12"><Skeleton className="h-96 w-full" /></div>;
  }

  if (!category) {
    notFound();
  }

  return <CategoryPageContent category={category} />;
}
