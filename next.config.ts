import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/@:username',
      destination: '/profile/:username',
    },
  ],
};

export default nextConfig;
