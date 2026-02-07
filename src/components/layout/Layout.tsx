import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import MobileBottomNavigation from './MobileBottomNavigation';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <MobileBottomNavigation />
    </div>
  );
}

export default Layout;
