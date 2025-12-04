
import { products, categories, reviews as allReviews } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ProductPageClient } from '@/components/products/product-page-client';

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
    title: `${product.name} | Samar Store`,
    description: product.description.substring(0, 160),
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === params.productId);

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

export async function generateStaticParams() {
    return products.map(product => ({
        productId: product.id,
    }));
}
