'use client';

import { useContext } from 'react';
import { Heart } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { WishlistContext } from '@/contexts/wishlist-context';

type WishlistButtonProps = {
  productId: string;
} & ButtonProps;

export function WishlistButton({ productId, size = 'icon', ...props }: WishlistButtonProps) {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlistItems.includes(productId);
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productId);
      toast({
        title: 'Removed from Wishlist',
        description: 'Product has been removed from your wishlist.',
      });
    } else {
      addToWishlist(productId);
      toast({
        title: 'Added to Wishlist!',
        description: 'Product has been added to your wishlist.',
      });
    }
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={(e) => {
        e.preventDefault(); // Prevent link navigation if inside a card
        handleWishlistToggle();
      }}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      {...props}
    >
      <Heart className={cn('h-5 w-5', isInWishlist && 'fill-primary text-primary')} />
    </Button>
  );
}
