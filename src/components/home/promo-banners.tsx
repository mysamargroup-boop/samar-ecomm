
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PromoBanners() {
  const banners = [
    {
      title: 'Mega Electronics Sale',
      description: 'Up to 40% off on the latest gadgets. Don\'t miss out!',
      imageUrl: 'https://picsum.photos/seed/promo1/800/400',
      imageHint: 'electronics sale',
      href: '/electronics',
      buttonText: 'Shop Now',
    },
    {
      title: 'New Season Fashion',
      description: 'Upgrade your style with our trending collection.',
      imageUrl: 'https://picsum.photos/seed/promo2/800/400',
      imageHint: 'fashion collection',
      href: '/apparel',
      buttonText: 'Explore Looks',
    },
  ];

  return (
    <section className="py-12 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {banners.map((banner, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group">
              <div className="aspect-video">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={banner.imageHint}
                />
              </div>
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-white">
                <h3 className="text-3xl font-bold font-headline mb-2 drop-shadow-lg">{banner.title}</h3>
                <p className="text-lg mb-4 drop-shadow-md">{banner.description}</p>
                <Link href={banner.href}>
                    <Button variant="secondary">{banner.buttonText}</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
