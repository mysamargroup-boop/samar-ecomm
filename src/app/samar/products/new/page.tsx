import { ProductForm } from '@/components/products/product-form';
import { categories } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Add New Product</h1>
      <Card>
        <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Fill out the form below to add a new product to your store.</CardDescription>
        </CardHeader>
        <CardContent>
            <ProductForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
