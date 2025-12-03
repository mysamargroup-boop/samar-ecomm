
'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ShareButton({ productName }: { productName: string }) {
  const { toast } = useToast();
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // navigator.share is only available in secure contexts (HTTPS)
    // and on certain browsers. Check for its existence after component mounts.
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: `Check out ${productName} on Samar Store!`,
          text: `I found this amazing product: ${productName}`,
          url: window.location.href,
        });
        toast({ title: 'Shared successfully!' });
      } catch (error) {
        // This can happen if the user cancels the share dialog
        console.log('Share failed:', error);
      }
    } else {
        // Fallback for browsers that don't support navigator.share
        navigator.clipboard.writeText(window.location.href);
        toast({ title: 'Link Copied!', description: 'Product link copied to your clipboard.' });
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share this product">
      <Share2 className="h-5 w-5" />
    </Button>
  );
}
