import Header from '@/components/layout/Header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={'flex min-h-dvh flex-col bg-zinc-50 dark:bg-zinc-900'}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
