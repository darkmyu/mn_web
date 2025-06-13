import '@/tailwind.css';

import Layout from '@/components/layout/Layout';
import ModalProvider from '@/components/provider/ModalProvider';
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
        <ThemeProvider>
          <Layout>{children}</Layout>
          <ModalProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
