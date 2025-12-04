
import { ProductPageClient } from '@/components/products/product-page-client';

export default function ProductPage({ params }: { params: { productSlug: string } }) {
  return <ProductPageClient productSlug={params.productSlug} />;
}
