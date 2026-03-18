import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import MobileBottomNavigation from './MobileBottomNavigation';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Sidebar />
      <main className="flex flex-1 flex-col pb-[calc(3.75rem+env(safe-area-inset-bottom))] lg:pb-0 lg:pl-16">
        {children}
      </main>
      <MobileBottomNavigation />
    </div>
  );
}

export default Layout;
