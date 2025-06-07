import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import { NextConfig } from 'next';

// Only run setupDevPlatform in development
if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

