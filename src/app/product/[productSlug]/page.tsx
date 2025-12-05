
import { ProductPageClient } from '@/components/products/product-page-client';
import { products } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { productSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.productSlug);
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
  const product = products.find((p) => p.slug === params.productSlug);

  if (!product) {
    notFound();
  }
  
  return <ProductPageClient productSlug={params.productSlug} />;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    productSlug: product.slug,
  }));
}
