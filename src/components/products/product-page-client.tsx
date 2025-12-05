
'use client';

import { categories, reviews as allReviews } from '@/lib/placeholder-data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Zap } from 'lucide-react';
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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FeaturedProductsSlider } from '@/components/home/featured-products-slider';
import { InfoBar } from '@/components/home/info-bar';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Breadcrumbs } from '../ui/breadcrumbs';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function SaleCountdownTimer({ endDate }: { endDate: Date }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <span className="text-xl font-bold">{timeLeft[interval as keyof typeof timeLeft]}</span>
        <span className="text-xs uppercase">{interval}</span>
      </div>
    );
  });
  
  if (!timerComponents.length) return null;

  return (
    <div className="bg-destructive/10 text-destructive border-2 border-dashed border-destructive/20 rounded-lg p-4 my-4">
        <p className="text-center font-semibold text-sm mb-2">🔥 Flash Sale Ends In:</p>
        <div className="flex justify-center gap-4">
            {timerComponents}
        </div>
    </div>
  )
}


function StickyAddToCartBar({ product, onAddToCart, onBuyNow, onSale }: { product: Product, onAddToCart: () => void, onBuyNow: () => void, onSale: boolean }) {
    const discountPercentage = onSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 bg-background border-t p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
        <div className="flex items-center justify-between mb-3">
             {onSale ? (
                <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-maroon">{formatPrice(product.salePrice!)}</p>
                    <p className="text-sm font-medium text-muted-foreground line-through">{formatPrice(product.price)}</p>
                    <p className="text-sm font-bold text-green-600">{discountPercentage}% OFF</p>
                </div>
            ) : (
                <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
            )}
             <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
        </div>
        <div className="flex items-center gap-4">
            <Button size="lg" variant="outline" className="w-full" onClick={onAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
            </Button>
            <Button size="lg" className={cn("w-full bg-gradient-to-r from-buy-now-start to-buy-now-end text-white hover:opacity-90 transition-opacity")} onClick={onBuyNow}>
                <Zap className="mr-2 h-5 w-5"/>
                Buy Now
            </Button>
        </div>
    </div>
  )
}

export function ProductPageClient({ productSlug }: { productSlug: string }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const firestore = useFirestore();

  const productQuery = useMemoFirebase(
    () => (firestore && productSlug ? query(collection(firestore, 'products'), where('slug', '==', productSlug)) : null),
    [firestore, productSlug]
  );
  
  const { data: productData, isLoading } = useCollection<Product>(productQuery);
  const product = productData?.[0];

  const relatedProductsQuery = useMemoFirebase(
    () => (firestore && product ? query(collection(firestore, 'products'), where('categoryId', '==', product.categoryId)) : null),
    [firestore, product]
  );
  const { data: relatedProductsData } = useCollection<Product>(relatedProductsQuery);


  if (isLoading) {
    return (
       <div className="container mx-auto px-4 py-8 md:py-12">
        <Skeleton className="h-6 w-1/3 mb-8" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
  }

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/checkout');
  }

  const category = categories.find((c) => c.id === product.categoryId);

  const now = new Date();
  const isSaleActive = product.salePrice && product.salePrice < product.price && 
                       (!product.salePriceStartDate || new Date(product.salePriceStartDate) <= now) &&
                       (!product.salePriceEndDate || new Date(product.salePriceEndDate) >= now);

  const productReviews = allReviews.filter(r => r.productId === product.id && r.status === 'Approved');
  
  const relatedProducts = (relatedProductsData || [])
    .filter(p => p.id !== product.id)
    .slice(0, 8);

  const dimensionsString = product.dimensions && product.dimensions.length && product.dimensions.width && product.dimensions.height 
    ? `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} cm`
    : null;
    
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
  ];
  if (category) {
    breadcrumbItems.push({ label: category.name, href: `/collections/${category.slug}` });
  }
  breadcrumbItems.push({ label: product.name });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 pb-24 md:pb-0">
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
             {isSaleActive && (
              <Badge className="absolute top-4 right-4" variant="destructive">Sale</Badge>
            )}
          </Carousel>
        </div>
        
        <div className="flex flex-col">
          {category && (
            <Link href={`/collections/${category.slug}`}>
              <Badge variant="secondary" className="mb-2 w-fit">{category.name}</Badge>
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-2">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-2">
            {isSaleActive ? (
                <>
                    <p className="text-3xl font-bold text-maroon">{formatPrice(product.salePrice!)}</p>
                    <p className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</p>
                </>
            ) : (
                <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
            )}
           </div>

            {isSaleActive && product.salePriceEndDate && (
                <SaleCountdownTimer endDate={new Date(product.salePriceEndDate)} />
            )}
          
          <p className="text-muted-foreground mb-6">{product.shortDescription || product.description}</p>
          
          <div className="pt-6 space-y-6 hidden md:block">
            <div className="flex items-center gap-4">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" className={cn("w-full bg-gradient-to-r from-buy-now-start to-buy-now-end text-white hover:opacity-90 transition-opacity")} onClick={handleBuyNow}>
                  <Zap className="mr-2 h-5 w-5"/>
                  Buy Now
              </Button>
              <WishlistButton productId={product.id} size="lg" />
              <ShareButton productName={product.name} />
            </div>
             <p className="text-sm text-muted-foreground">
              {product.inventory > 0
                ? `${product.inventory} items in stock.`
                : 'Out of stock.'}
              {product.sku && <span className="ml-4">SKU: {product.sku}</span>}
            </p>
          </div>

           <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                  <p>{product.longDescription || product.description}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-muted-foreground">
                    {product.weight && <li className="flex justify-between"><span>Weight</span><span>{product.weight}g</span></li>}
                    {dimensionsString && <li className="flex justify-between"><span>Dimensions</span><span>{dimensionsString}</span></li>}
                    {product.material && <li className="flex justify-between"><span>Material</span><span>{product.material}</span></li>}
                     {product.tags && product.tags.length > 0 && (
                       <li className="flex justify-between items-start">
                         <span>Tags</span>
                         <div className="flex flex-wrap gap-1 justify-end max-w-[70%]">
                            {product.tags.map(tag => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                       </li>
                    )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
      
       <div className="my-12">
        <InfoBar />
      </div>

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
            <FeaturedProductsSlider products={relatedProducts} />
          </div>
         </>
       )}
      
      <StickyAddToCartBar product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onSale={isSaleActive} />
    </div>
  );
}
