import '@/tailwind.css';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/layout/Layout';
import localFont from 'next/font/local';

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
        </ThemeProvider>
      </body>
    </html>
  );
}
