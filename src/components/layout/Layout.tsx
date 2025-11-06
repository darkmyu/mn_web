import React from 'react';
import Sidebar from '../sidebar/Sidebar';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative flex min-h-dvh bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
