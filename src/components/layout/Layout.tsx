import Header from '@/components/layout/Header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={'flex min-h-dvh flex-col bg-neutral-50 dark:bg-neutral-900'}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
