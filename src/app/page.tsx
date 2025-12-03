import { HeroSlider } from '@/components/home/hero-slider';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <HeroSlider />
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Check out our hand-picked selection of the best products.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">Shop All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
