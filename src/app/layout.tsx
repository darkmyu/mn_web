import '@/tailwind.css';

import Layout from '@/components/layout/Layout';
import ModalRenderer from '@/components/modal/ModalRenderer';
import AuthProvider from '@/components/provider/AuthProvider';
import TanStackQueryProvider from '@/components/provider/TanStackQueryProvider';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '몽냥',
  description: '몽냥에서 매일매일 쏟아지는 귀여운 동물들을 만나보세요!',
  openGraph: {
    type: 'website',
    title: '몽냥',
    description: '몽냥에서 매일매일 쏟아지는 귀여운 동물들을 만나보세요!',
    images: 'https://image.mongnyang.com/mongnyang.jpg',
    url: 'https://mongnyang.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: '몽냥',
    images: 'https://image.mongnyang.com/mongnyang.jpg',
    description: '몽냥에서 매일매일 쏟아지는 귀여운 동물들을 만나보세요!',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <TanStackQueryProvider>
          <ThemeProvider>
            <AuthProvider />
            <ModalRenderer />
            <Layout>{children}</Layout>
            <Toaster
              position="top-center"
              toastOptions={{
                className: '!text-sm !text-zinc-900 !bg-zinc-100 dark:!text-zinc-50 dark:!bg-zinc-800',
              }}
            />
          </ThemeProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
