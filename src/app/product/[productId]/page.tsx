
import { ProductPageClient } from '@/components/products/product-page-client';
import { products } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.id === params.productId);
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

export default function ProductPage({ params }: { params: { productId: string } }) {
  return <ProductPageClient productId={params.productId} />;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}
