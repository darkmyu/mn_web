import '@/tailwind.css';

import Layout from '@/components/layout/Layout';
import AuthProvider from '@/components/provider/AuthProvider';
import TanStackQueryProvider from '@/components/provider/TanStackQueryProvider';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import React from 'react';

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
            <Layout>{children}</Layout>
          </ThemeProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
