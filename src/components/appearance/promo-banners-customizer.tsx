
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';


const initialBanners = [
    {
      id: 'promo1',
      title: 'Mega Electronics Sale',
      description: 'Up to 40% off on the latest gadgets. Don\'t miss out!',
      imageUrl: 'https://picsum.photos/seed/promo1/800/400',
      href: '/electronics',
      buttonText: 'Shop Now',
    },
    {
      id: 'promo2',
      title: 'New Season Fashion',
      description: 'Upgrade your style with our trending collection.',
      imageUrl: 'https://picsum.photos/seed/promo2/800/400',
      href: '/apparel',
      buttonText: 'Explore Looks',
    },
  ];

export function PromoBannersCustomizer() {
  const [banners, setBanners] = useState(initialBanners);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  const handleImageChange = (index: number, newImageUrl: string) => {
    const newBanners = [...banners];
    newBanners[index].imageUrl = newImageUrl;
    setBanners(newBanners);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
        handleImageChange(index, reader.result as string);
         toast({
          title: "Image Selected",
          description: "Image preview has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving promo banners:', banners);
    toast({
        title: 'Settings Saved',
        description: 'Your promotional banners have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {banners.map((banner, index) => (
          <AccordionItem key={banner.id} value={`item-${index + 1}`}>
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                />
                <span>Banner {index + 1}: {banner.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${banner.id}`}>Title</Label>
                    <Input id={`title-${banner.id}`} defaultValue={banner.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${banner.id}`}>Description</Label>
                    <Input id={`description-${banner.id}`} defaultValue={banner.description} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor={`buttonText-${banner.id}`}>Button Text</Label>
                        <Input id={`buttonText-${banner.id}`} defaultValue={banner.buttonText} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor={`href-${banner.id}`}>Button Link</Label>
                        <Input id={`href-${banner.id}`} defaultValue={banner.href} />
                    </div>
                  </div>
                </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`imageUrl-${banner.id}`}>Image</Label>
                      <div className="flex items-center gap-2">
                          <Input 
                            id={`imageUrl-${banner.id}`} 
                            value={banner.imageUrl} 
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="https://... or select file"
                          />
                           <input
                            type="file"
                            ref={el => fileInputRefs.current[index] = el}
                            onChange={(e) => handleFileChange(e, index)}
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => fileInputRefs.current[index]?.click()}
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
