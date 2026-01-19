import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-9d149cdc6c92422ab589264b4c9661b2.r2.dev',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'ssl.pstatic.net',
      },
      {
        hostname: 'k.kakaocdn.net',
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
