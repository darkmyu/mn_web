import '@/tailwind.css';

import Layout from '@/components/layout/Layout';
import ModalRenderer from '@/components/modal/ModalRenderer';
import AuthProvider from '@/components/provider/AuthProvider';
import TanStackQueryProvider from '@/components/provider/TanStackQueryProvider';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import React from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

const pretendardFonts = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
});

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '몽냥',
  description: '몽냥에서 매일매일 쏟아지는 귀여운 동물들을 만나보세요.',
  openGraph: {
    title: '몽냥',
    description: '몽냥에서 매일매일 쏟아지는 귀여운 동물들을 만나보세요.',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={pretendardFonts.className} suppressHydrationWarning>
      <body>
        <TanStackQueryProvider>
          <ThemeProvider>
            <AuthProvider />
            <ModalRenderer />
            <Layout>{children}</Layout>
            <Toaster
              position="top-right"
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
