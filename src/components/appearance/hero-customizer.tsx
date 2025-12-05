
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
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
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

const initialHeroSlides = [
  {
    id: 'slide1',
    image: PlaceHolderImages.find((img) => img.id === 'slider1'),
    title: 'Latest Tech Collection',
    description: 'Discover cutting-edge gadgets and accessories.',
    buttonText: 'Shop Electronics',
    href: '/electronics',
  },
  {
    id: 'slide2',
    image: PlaceHolderImages.find((img) => img.id === 'slider2'),
    title: 'New Winter Apparel',
    description: 'Stay warm and stylish this season.',
    buttonText: 'Shop Apparel',
    href: '/apparel',
  },
  {
    id: 'slide3',
    image: PlaceHolderImages.find((img) => img.id === 'slider3'),
    title: 'Modern Home Essentials',
    description: 'Elevate your living space with our curated decor.',
    buttonText: 'Shop Home',
    href: '/home-goods',
  },
];

export function HeroCustomizer() {
  const [slides, setSlides] = useState(initialHeroSlides.map(s => ({...s, imageUrl: s.image?.imageUrl || ''})));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  const handleImageChange = (index: number, newImageUrl: string) => {
    const newSlides = [...slides];
    newSlides[index].imageUrl = newImageUrl;
    setSlides(newSlides);
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
    console.log('Saving hero slides:', slides);
    toast({
        title: 'Settings Saved',
        description: 'Your hero banner has been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {slides.map((slide, index) => (
          <AccordionItem key={slide.id} value={`item-${index + 1}`}>
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                {slide.imageUrl && (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                )}
                <span>Slide {index + 1}: {slide.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${slide.id}`}>Title</Label>
                    <Input id={`title-${slide.id}`} defaultValue={slide.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${slide.id}`}>Description</Label>
                    <Input id={`description-${slide.id}`} defaultValue={slide.description} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor={`buttonText-${slide.id}`}>Button Text</Label>
                        <Input id={`buttonText-${slide.id}`} defaultValue={slide.buttonText} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor={`href-${slide.id}`}>Button Link</Label>
                        <Input id={`href-${slide.id}`} defaultValue={slide.href} />
                    </div>
                  </div>
                </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`imageUrl-${slide.id}`}>Image</Label>
                      <div className="flex items-center gap-2">
                          <Input 
                            id={`imageUrl-${slide.id}`} 
                            value={slide.imageUrl} 
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
                  {slide.imageUrl && (
                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                       <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover" />
                    </div>
                  )}
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
