import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production URL configuration
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kwanhoonarte.com',
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression and optimization
  compress: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
