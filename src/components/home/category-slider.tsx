
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { categories } from '@/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';

export function CategorySlider() {
    const mainCategories = categories.filter(c => !c.parentId);
    const categoryImages = [
        'https://picsum.photos/seed/electronics/200/200',
        'https://picsum.photos/seed/apparel/200/200',
        'https://picsum.photos/seed/homegoods/200/200',
        'https://picsum.photos/seed/books/200/200',
        'https://picsum.photos/seed/kitchen/200/200',
        'https://picsum.photos/seed/toys/200/200',
    ]

  return (
    <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
             <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Shop by Category</h2>
            </div>
            <Carousel
                opts={{
                align: 'start',
                loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                {mainCategories.map((category, index) => (
                    <CarouselItem key={category.id} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-6">
                        <Link href={`/${category.slug}`}>
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="relative aspect-square w-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                                    <Image 
                                        src={categoryImages[index % categoryImages.length]} 
                                        alt={category.name} 
                                        fill 
                                        className="object-cover"
                                        data-ai-hint="category image"
                                    />
                                </div>
                                <p className="font-semibold text-center group-hover:text-primary transition-colors">{category.name}</p>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    </section>
  );
}
