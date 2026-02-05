import '@/tailwind.css';

import Layout from '@/components/layout/Layout';
import ModalRenderer from '@/components/modal/ModalRenderer';
import AuthProvider from '@/components/provider/AuthProvider';
import TanStackQueryProvider from '@/components/provider/TanStackQueryProvider';
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
