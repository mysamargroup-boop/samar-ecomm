
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/placeholder-data';
import { WishlistButton } from './wishlist-button';
import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
  showBuyNow?: boolean;
};

export function ProductCard({ product, showBuyNow = true }: ProductCardProps) {
  const category = categories.find(c => c.id === product.categoryId);
  const onSale = product.salePrice && product.salePrice < product.price;
  const discountPercentage = onSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block aspect-square relative overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </Link>
         {onSale && (
            <div className="absolute top-2 left-2">
                <Badge variant="destructive">{discountPercentage}% OFF</Badge>
            </div>
        )}
        <div className="absolute top-2 right-2">
            <WishlistButton productId={product.id} />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col items-center text-center">
        {category && (
          <Badge variant="secondary" className="mb-2">{category.name}</Badge>
        )}
        <CardTitle className="text-lg leading-tight mb-2 flex-grow flex flex-col justify-center min-h-[2.5em]">
          <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors no-underline">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-baseline gap-2 mt-auto">
            {onSale ? (
                <>
                    <p className="text-xl font-bold font-headline text-maroon">{formatPrice(product.salePrice!)}</p>
                    <p className="text-sm font-medium text-muted-foreground line-through">{formatPrice(product.price)}</p>
                </>
            ) : (
                <p className="text-xl font-bold font-headline text-primary">{formatPrice(product.price)}</p>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-col w-full gap-2">
            <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
            {showBuyNow && (
              <Link href="/checkout">
                  <Button className="w-full">Buy Now</Button>
              </Link>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
