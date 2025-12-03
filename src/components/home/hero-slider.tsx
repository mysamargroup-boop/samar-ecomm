
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HeroSlider() {
  const sliderImages = [
    {
      image: PlaceHolderImages.find((img) => img.id === 'slider1'),
      title: 'Latest Tech Collection',
      description: 'Discover cutting-edge gadgets and accessories.',
      buttonText: 'Shop Electronics',
      href: '/electronics',
    },
    {
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

  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {sliderImages.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[600px] w-full">
                {slide.image && (
                  <Image
                    src={slide.image.imageUrl}
                    alt={slide.image.description}
                    data-ai-hint={slide.image.imageHint}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md">
                    {slide.description}
                  </p>
                  <Link href={slide.href}>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
      </Carousel>
    </section>
  );
}
