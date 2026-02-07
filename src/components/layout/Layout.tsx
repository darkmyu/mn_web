import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import MobileBottomNavigation from './MobileBottomNavigation';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative flex h-dvh flex-col lg:flex-row lg:overflow-hidden">
      <Sidebar />
      <main className="flex-1 pb-15 lg:overflow-y-auto lg:pb-0">{children}</main>
      <MobileBottomNavigation />
    </div>
  );
}

export default Layout;
