
import { ProductPageClient } from '@/components/products/product-page-client';
import type { Metadata } from 'next';
import { placeholderProducts } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';

type Props = {
  params: { productSlug: string };
};

// This function needs to be updated to fetch data from Supabase
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = placeholderProducts.find(p => p.slug === params.productSlug);
  
  if (!product) {
     return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { productSlug: string } }) {  
  return <ProductPageClient productSlug={params.productSlug} />;
}

// This function needs to be updated to fetch data from Supabase
export async function generateStaticParams() {
  return placeholderProducts.map(doc => ({
    productSlug: doc.slug,
  }));
}
