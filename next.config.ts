import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/cloudflareImageLoader.ts',
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
