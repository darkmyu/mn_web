import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'ssl.pstatic.net',
      },
      {
        hostname: 'k.kakaocdn.net',
      },
      {
        hostname: 'image.mongnyang.com',
      },
      {
        hostname: 'image-dev.mongnyang.com',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/@:username/:path*',
      destination: '/profile/:username/:path*',
    },
  ],
};

export default nextConfig;
