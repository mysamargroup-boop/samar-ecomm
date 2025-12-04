
'use client';

import { HeroSlider } from '@/components/home/hero-slider';
import { blogPosts } from '@/lib/placeholder-data';
import { FeaturedProductsSlider } from '@/components/home/featured-products-slider';
import { InfoBar } from '@/components/home/info-bar';
import { CategorySlider } from '@/components/home/category-slider';
import { PromoBanners } from '@/components/home/promo-banners';
import { RecentlyViewed } from '@/components/home/recently-viewed';
import { BlogSection } from '@/components/home/blog-section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, getFirestore, limit, query, where } from 'firebase/firestore';
import type { Product } from '@/lib/types';

function HomePageContent() {
  const { firestore } = useMemoFirebase(() => ({ firestore: getFirestore() }), []);

  const featuredQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'products'), limit(8)) : null,
    [firestore]
  );
  const onSaleQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'products'), where('salePrice', '!=', null), limit(8)) : null,
    [firestore]
  );

  const { data: featuredProducts, isLoading: isLoadingFeatured } = useCollection<Product>(featuredQuery);
  const { data: onSaleProducts, isLoading: isLoadingSale } = useCollection<Product>(onSaleQuery);
  
  const recentPosts = blogPosts.slice(0, 3);
  const recentlyViewedProducts = featuredProducts?.slice(4, 9) || [];


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
          {isLoadingFeatured ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <FeaturedProductsSlider products={featuredProducts || []} />
          )}
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
          {isLoadingSale ? (
             <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <FeaturedProductsSlider products={onSaleProducts || []} />
          )}
        </div>
      </section>

      <RecentlyViewed products={recentlyViewedProducts} />

      <BlogSection posts={recentPosts} />
    </>
  );
}

export default function Home() {
  return <HomePageContent />;
}
