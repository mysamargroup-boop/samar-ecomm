
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const initialBanner = {
  id: 'explore-banner',
  title: 'Experience Nirvana',
  subtitle: 'Premium Audio, Unmatched Quality.',
  imageUrl: PlaceHolderImages.find(img => img.id === 'explore-banner')?.imageUrl || 'https://picsum.photos/seed/explore/1200/400',
  href: '/electronics',
};

export function ExploreBannerCustomizer() {
  const [banner, setBanner] = useState(initialBanner);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handleImageChange = (newImageUrl: string) => {
    setBanner(prev => ({ ...prev, imageUrl: newImageUrl }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageChange(reader.result as string);
        toast({
          title: "Image Selected",
          description: "Image preview has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" defaultValue={banner.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input id="subtitle" defaultValue={banner.subtitle} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="href">Link URL</Label>
            <Input id="href" defaultValue={banner.href} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="imageUrl"
                value={banner.imageUrl}
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="https://... or select file"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
          </div>
          <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
            <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
