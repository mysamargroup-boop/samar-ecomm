
import { Metadata } from 'next';
import { storeDetails } from '@/lib/placeholder-data';

// Using `export const metadata` is equivalent to using `generateMetadata` in a page.
// This is the recommended way to set static metadata in the app router.
export const metadata: Metadata = {
  metadataBase: new URL('https://samar-store.com'),
  title: {
    default: storeDetails.name,
    template: `%s | ${storeDetails.name}`,
  },
  description: storeDetails.tagline,
  openGraph: {
    title: storeDetails.name,
    description: storeDetails.tagline,
    url: 'https://samar-store.com',
    siteName: storeDetails.name,
    images: [
      {
        url: 'https://samar-store.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: storeDetails.name,
    description: storeDetails.tagline,
    // creator: '@yourtwitterhandle',
    images: ['https://samar-store.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Head() {
  // The <Head /> component is not used in the app router.
  // Instead, you should export a `metadata` object or a `generateMetadata` function.
  // This file is kept to export the metadata object.
  // You can also place this in your root layout.tsx file.
  return null;
}

