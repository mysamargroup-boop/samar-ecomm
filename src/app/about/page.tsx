
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | CommerceWave',
  description: 'Learn more about CommerceWave, our mission, and our commitment to quality.',
};

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'slider1');
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          About CommerceWave
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          The future of e-commerce, delivered to your doorstep.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="prose dark:prose-invert max-w-none">
          <h2>Our Mission</h2>
          <p>
            At CommerceWave, our mission is to revolutionize the online shopping experience by providing a curated
            selection of high-quality products, seamless user experience, and unparalleled customer service. We
            believe that shopping online should be simple, enjoyable, and trustworthy.
          </p>
          <h2>Our Story</h2>
          <p>
            Founded in 2024, CommerceWave started as a small project with a big idea: to create an e-commerce
            platform that puts customers first. We were tired of cluttered websites, confusing navigation, and
            impersonal service. We envisioned a place where customers could easily discover great products and feel
            confident in their purchases.
          </p>
          <p>
            From our humble beginnings, we have grown into a thriving online marketplace, serving thousands of
            happy customers. Our commitment to quality and innovation continues to drive us forward as we explore
            new ways to make your shopping experience even better.
          </p>
        </div>
        <div className="aspect-video relative rounded-lg overflow-hidden border">
           {aboutImage && <Image
              src={aboutImage.imageUrl}
              alt="A snapshot of the CommerceWave office"
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />}
        </div>
      </div>
    </div>
  );
}
