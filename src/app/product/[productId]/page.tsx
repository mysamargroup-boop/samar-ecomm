import { products, categories } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ShareButton } from '@/components/products/share-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.id === params.productId);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: `${product.name} | Samar Store`,
    description: product.description.substring(0, 160),
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative rounded-lg overflow-hidden border">
                    <Image
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint="product image"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        <div className="flex flex-col">
          {category && (
            <Link href={`/${category.slug}`}>
              <Badge variant="secondary" className="mb-2 w-fit">{category.name}</Badge>
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-6">{formatPrice(product.price)}</p>
          
          <div className="prose dark:prose-invert max-w-none text-muted-foreground mb-8">
            <p>{product.description}</p>
          </div>
          
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href="/cart">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Link>
              </Button>
              <ShareButton productName={product.name} />
            </div>
             <p className="text-sm text-muted-foreground mt-4">
              {product.inventory > 0
                ? `${product.inventory} items in stock.`
                : 'Out of stock.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return products.map(product => ({
        productId: product.id,
    }));
}
