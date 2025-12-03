import { ProductForm } from '@/components/products/product-form';
import { products, categories } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditProductPage({ params }: { params: { productId: string } }) {
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Edit Product</h1>
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
