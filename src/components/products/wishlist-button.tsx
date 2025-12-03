'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type WishlistButtonProps = {
  productId: string;
} & ButtonProps;

export function WishlistButton({ productId, size = 'icon', ...props }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    // In a real app, you'd call a server action here to update the user's wishlist
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);

    toast({
      title: newWishlistState ? 'Added to Wishlist!' : 'Removed from Wishlist',
      description: `Product has been ${newWishlistState ? 'added to' : 'removed from'} your wishlist.`,
    });
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleWishlistToggle}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      {...props}
    >
      <Heart className={cn('h-5 w-5', isInWishlist && 'fill-primary text-primary')} />
    </Button>
  );
}
