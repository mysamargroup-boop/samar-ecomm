'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ProductReviewFormProps = {
  productId: string;
};

// In a real app, you would check the user's session
const isLoggedIn = true;

export function ProductReviewForm({ productId }: ProductReviewFormProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a star rating.',
        variant: 'destructive',
      });
      return;
    }
    console.log({ productId, rating, comment });
    toast({
      title: 'Review Submitted!',
      description: 'Thank you. Your review is pending approval.',
    });
    setRating(0);
    setComment('');
  };

  if (!isLoggedIn) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">
                      Please{' '}
                      <Link href="/login" className="text-primary underline">
                          log in
                      </Link>{' '}
                      to leave a review.
                  </p>
              </CardContent>
          </Card>
      );
  }


  return (
    <Card>
        <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>Share your thoughts on this product.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="font-medium">Your Rating</label>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <button
                            type="button"
                            key={starValue}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1"
                            >
                            <Star
                                className={cn(
                                'h-6 w-6 transition-colors',
                                starValue <= (hoverRating || rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-muted-foreground'
                                )}
                            />
                            </button>
                        );
                        })}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="comment" className="font-medium">Your Review</label>
                    <Textarea
                        id="comment"
                        placeholder="What did you like or dislike?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />
                </div>
                <div className="text-right">
                    <Button type="submit">Submit Review</Button>
                </div>
            </form>
        </CardContent>
    </Card>
  );
}
