
'use client';

import { HeroSlider } from '@/components/home/hero-slider';
import { products, blogPosts } from '@/lib/placeholder-data';
import { FeaturedProductsSlider } from '@/components/home/featured-products-slider';
import { InfoBar } from '@/components/home/info-bar';
import { CategorySlider } from '@/components/home/category-slider';
import { PromoBanners } from '@/components/home/promo-banners';
import { RecentlyViewed } from '@/components/home/recently-viewed';
import { BlogSection } from '@/components/home/blog-section';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const onSaleProducts = products.filter(p => p.salePrice).slice(0, 8);
  const recentPosts = blogPosts.slice(0, 3);
  const recentlyViewedProducts = products.slice(4,9);


  return (
    <>
      <HeroSlider />
      <InfoBar />
      <CategorySlider />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Featured Products
            </h2>
            <Link href="/products">
                <Button variant="outline">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
          </div>
          <FeaturedProductsSlider products={featuredProducts} />
        </div>
      </section>

      <PromoBanners />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Discover Your Next Favorite
            </h2>
             <Link href="/products">
                <Button variant="outline">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
          </div>
          <FeaturedProductsSlider products={onSaleProducts} />
        </div>
      </section>

      <RecentlyViewed products={recentlyViewedProducts} />

      <BlogSection posts={recentPosts} />

    </>
  );
}
