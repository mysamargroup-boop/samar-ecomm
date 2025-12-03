
import { products, categories, reviews as allReviews } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { ShareButton } from '@/components/products/share-button';
import { WishlistButton } from '@/components/products/wishlist-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from '@/components/ui/separator';
import { ProductReviewForm } from '@/components/reviews/product-review-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/products/product-card';

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
  const onSale = product.salePrice != null && product.salePrice < product.price;
  const productReviews = allReviews.filter(r => r.productId === product.id && r.status === 'Approved');
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

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
             {onSale && (
              <Badge className="absolute top-4 right-4" variant="destructive">Sale</Badge>
            )}
          </Carousel>
        </div>
        
        <div className="flex flex-col">
          {category && (
            <Link href={`/${category.slug}`}>
              <Badge variant="secondary" className="mb-2 w-fit">{category.name}</Badge>
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-2">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-6">
            {onSale ? (
                <>
                    <p className="text-3xl font-bold text-primary">{formatPrice(product.salePrice!)}</p>
                    <p className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</p>
                </>
            ) : (
                <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
            )}
           </div>
          
          <div className="prose dark:prose-invert max-w-none text-muted-foreground mb-8">
            <p>{product.description}</p>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          )}
          
          <div className="pt-6">
            <div className="flex items-center gap-4">
              <Link href="/cart" className="flex-1">
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </Link>
              <WishlistButton productId={product.id} size="lg" />
              <ShareButton productName={product.name} />
            </div>
             <p className="text-sm text-muted-foreground mt-4">
              {product.inventory > 0
                ? `${product.inventory} items in stock.`
                : 'Out of stock.'}
              {product.sku && <span className="ml-4">SKU: {product.sku}</span>}
            </p>
          </div>
        </div>
      </div>

       <Separator className="my-12" />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">Customer Reviews</h2>
        {productReviews.length > 0 ? (
          <div className="space-y-6 mb-10">
            {productReviews.map(review => (
              <Card key={review.id}>
                <CardHeader className='pb-4'>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.authorName}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center mb-10">No reviews yet. Be the first to share your thoughts!</p>
        )}
        <ProductReviewForm productId={product.id} />
      </div>

       {relatedProducts.length > 0 && (
         <>
          <Separator className="my-12" />
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-headline">You Might Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
         </>
       )}

    </div>
  );
}

export async function generateStaticParams() {
    return products.map(product => ({
        productId: product.id,
    }));
}
