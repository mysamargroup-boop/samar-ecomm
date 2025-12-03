
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

const heroSlides = [
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
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {heroSlides.map((slide, index) => (
          <AccordionItem key={slide.id} value={`item-${index + 1}`}>
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                {slide.image && (
                  <Image
                    src={slide.image.imageUrl}
                    alt={slide.image.description}
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
                 <div className="space-y-2">
                  <Label htmlFor={`imageUrl-${slide.id}`}>Image URL</Label>
                  <Input id={`imageUrl-${slide.id}`} defaultValue={slide.image?.imageUrl} />
                  {slide.image && (
                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden">
                       <Image src={slide.image.imageUrl} alt={slide.title} fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
