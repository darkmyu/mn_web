import '@/tailwind.css';

import AuthDialog from '@/components/dialog/AuthDialog';
import Layout from '@/components/layout/Layout';
import AuthProvider from '@/components/provider/AuthProvider';
import TanStackQueryProvider from '@/components/provider/TanStackQueryProvider';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import React from 'react';

interface Props {
  children: React.ReactNode;
  dialog: React.ReactNode;
}

const pretendardFonts = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
});

export default function RootLayout({ children, dialog }: Props) {
  return (
    <html lang="ko" className={pretendardFonts.className} suppressHydrationWarning>
      <body>
        <TanStackQueryProvider>
          <ThemeProvider>
            <AuthDialog />
            <AuthProvider />
            <Layout>
              {children}
              {dialog}
            </Layout>
          </ThemeProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
