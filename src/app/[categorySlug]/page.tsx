import { ProductCard } from '@/components/products/product-card';
import { categories, products } from '@/lib/placeholder-data';
import type { Category } from '@/lib/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { categorySlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.categorySlug);
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  return {
    title: `${category.name} | CommerceWave`,
    description: `Shop the best ${category.name.toLowerCase()} at CommerceWave.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id);

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

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

export async function generateStaticParams() {
    return categories.map((category: Category) => ({
        categorySlug: category.slug,
    }));
}
