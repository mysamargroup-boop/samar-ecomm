
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/placeholder-data';
import { WishlistButton } from './wishlist-button';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const category = categories.find(c => c.id === product.categoryId);
  const onSale = product.salePrice && product.salePrice < product.price;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="product image"
            />
             <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
              {onSale && (
                  <Badge variant="destructive">Sale</Badge>
              )}
              <WishlistButton productId={product.id} />
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {category && (
          <Badge variant="secondary" className="mb-2">{category.name}</Badge>
        )}
        <CardTitle className="text-lg leading-tight mb-2">
          <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-baseline gap-2">
            {onSale ? (
                <>
                    <p className="text-xl font-bold font-headline text-primary">{formatPrice(product.salePrice!)}</p>
                    <p className="text-sm font-medium text-muted-foreground line-through">{formatPrice(product.price)}</p>
                </>
            ) : (
                <p className="text-xl font-bold font-headline text-primary">{formatPrice(product.price)}</p>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
