import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.aceternity.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  eslint: {
    // Legacy template files have existing lint findings. prebuild checks the new portfolio feature.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
