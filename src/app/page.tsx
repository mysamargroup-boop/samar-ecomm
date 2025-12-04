
import { HeroSlider } from '@/components/home/hero-slider';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CategorySlider } from '@/components/home/category-slider';
import { PromoBanners } from '@/components/home/promo-banners';
import { FeaturedProductsSlider } from '@/components/home/featured-products-slider';
import { ProductCard } from '@/components/products/product-card';
import { InfoBar } from '@/components/home/info-bar';
import { RecentlyViewed } from '@/components/home/recently-viewed';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.slice(2, 6);
  const recentlyViewedProducts = products.slice(6, 8);

  return (
    <div className="flex flex-col">
      <HeroSlider />
      <InfoBar />
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

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">New Arrivals</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Fresh picks, just for you.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <RecentlyViewed products={recentlyViewedProducts} />
    </div>
  );
}
