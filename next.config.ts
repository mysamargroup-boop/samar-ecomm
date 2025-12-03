
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'httpshttps',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
    PAYMENT_GATEWAY_KEY_ID: process.env.PAYMENT_GATEWAY_KEY_ID,
    PAYMENT_GATEWAY_KEY_SECRET: process.env.PAYMENT_GATEWAY_KEY_SECRET,
    SHIPPING_PROVIDER_API_KEY: process.env.SHIPPING_PROVIDER_API_KEY,
  }
};

export default nextConfig;
