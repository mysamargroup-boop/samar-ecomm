import { CategoryForm } from '@/components/categories/category-form';
import { categories } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditCategoryPage({ params }: { params: { categoryId: string } }) {
  const category = categories.find((c) => c.id === params.categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Edit Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Update the details for "{category.name}".</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
