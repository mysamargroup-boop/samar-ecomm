
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export function ExploreBanner() {
    const bannerImage = PlaceHolderImages.find(img => img.id === 'explore-banner');

    if (!bannerImage) return null;

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <Link href="/electronics">
                    <div className="relative rounded-lg overflow-hidden group aspect-[2/1] md:aspect-[3/1]">
                        <Image
                            src={bannerImage.imageUrl}
                            alt="Explore Premium Audio"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={bannerImage.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent p-8 flex flex-col justify-center">
                            <h2 className="text-3xl md:text-5xl font-extrabold font-headline text-white drop-shadow-lg max-w-lg">
                                Experience Nirvana
                            </h2>
                             <p className="text-lg md:text-xl text-white/80 mt-2 drop-shadow-md">
                                Premium Audio, Unmatched Quality.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
