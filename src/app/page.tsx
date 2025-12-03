import { HeroSlider } from '@/components/home/hero-slider';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CategorySlider } from '@/components/home/category-slider';
import { PromoBanners } from '@/components/home/promo-banners';
import { FeaturedProductsSlider } from '@/components/home/featured-products-slider';

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col">
      <HeroSlider />
      <CategorySlider />
      <PromoBanners />
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Check out our hand-picked selection of the best products.
            </p>
          </div>
          <FeaturedProductsSlider products={featuredProducts} />
          <div className="text-center mt-12">
            <Link href="/products">
                <Button size="lg">Shop All Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
