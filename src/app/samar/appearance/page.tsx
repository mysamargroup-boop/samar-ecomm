

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HeroCustomizer } from '@/components/appearance/hero-customizer';
import { FeaturedProductsCustomizer } from '@/components/appearance/featured-products-customizer';
import { products } from '@/lib/placeholder-data';
import { InfoBarCustomizer } from '@/components/appearance/info-bar-customizer';
import { PromoBannersCustomizer } from '@/components/appearance/promo-banners-customizer';
import { ThemeCustomizer } from '@/components/settings/theme-customizer';
import { ExploreBannerCustomizer } from '@/components/appearance/explore-banner-customizer';


export default function AppearancePage() {
  const featuredProducts = products.slice(0, 4).map(p => p.id);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">Appearance</h1>
      
      <div className="space-y-6">
        <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize your store's colors and fonts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeCustomizer />
            </CardContent>
          </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Banner</CardTitle>
            <CardDescription>
              Customize the slides in your homepage hero banner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HeroCustomizer />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>
              Select which products to display on your homepage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeaturedProductsCustomizer allProducts={products} featuredProductIds={featuredProducts} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Info Bar</CardTitle>
            <CardDescription>
              Manage the informational icons and text below the hero banner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InfoBarCustomizer />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Promotional Banners</CardTitle>
            <CardDescription>
              Customize the two promotional banners on your homepage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PromoBannersCustomizer />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Explore Banner</CardTitle>
            <CardDescription>
              Customize the full-width promotional banner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExploreBannerCustomizer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
