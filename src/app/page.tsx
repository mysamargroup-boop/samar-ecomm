
'use client';

import { HeroSlider } from '@/components/home/hero-slider';
import { products, blogPosts } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CategorySlider } from '@/components/home/category-slider';
import { PromoBanners } from '@/components/home/promo-banners';
import { FeaturedProductsSlider } from '@/components/home/featured-products-slider';
import { ProductCard } from '@/components/products/product-card';
import { InfoBar } from '@/components/home/info-bar';
import { RecentlyViewed } from '@/components/home/recently-viewed';
import { BlogSection } from '@/components/home/blog-section';
import { useState } from 'react';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.slice(0, 6);
  const bestSellers = products.slice(2, 8);
  const topRated = products.slice(4, 10).reverse();
  
  const recentlyViewedProducts = products.slice(6, 8);
  const featuredBlogPosts = blogPosts.slice(0, 3);
  
  const [activeTab, setActiveTab] = useState('New Arrivals');

  const tabProducts: { [key: string]: typeof products } = {
    'New Arrivals': newArrivals,
    'Best Sellers': bestSellers,
    'Top Rated': topRated,
  };


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
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Discover Your Next Favorite</h2>
             <div className="flex justify-center items-center gap-2 mt-6">
                {Object.keys(tabProducts).map((tab) => (
                    <Button
                    key={tab}
                    variant={activeTab === tab ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setActiveTab(tab)}
                    >
                    {tab}
                    </Button>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {tabProducts[activeTab].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <BlogSection posts={featuredBlogPosts} />
      <RecentlyViewed products={recentlyViewedProducts} />
    </div>
  );
}
