
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroCustomizer } from '@/components/appearance/hero-customizer';
import { FeaturedProductsCustomizer } from '@/components/appearance/featured-products-customizer';
import { products } from '@/lib/placeholder-data';

export default function AppearancePage() {
  const featuredProducts = products.slice(0, 4).map(p => p.id);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Appearance</h1>
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero Banner</TabsTrigger>
          <TabsTrigger value="featured-products">Featured Products</TabsTrigger>
        </TabsList>
        <TabsContent value="hero">
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
        </TabsContent>
        <TabsContent value="featured-products">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
