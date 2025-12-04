
'use client';

import { ProductPageClient } from '@/components/products/product-page-client';

export default function ProductPage({ params }: { params: { productId: string } }) {
  return <ProductPageClient productId={params.productId} />;
}
