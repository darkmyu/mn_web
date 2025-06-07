import React from 'react';
import Header from '@/components/layout/Header';

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
