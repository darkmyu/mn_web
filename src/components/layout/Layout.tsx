import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import MobileBottomNavigation from './MobileBottomNavigation';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative flex h-full min-h-dvh flex-col lg:flex-row">
      <Sidebar />
      <main className="flex flex-1 flex-col pb-15 lg:pb-0 lg:pl-16">{children}</main>
      <MobileBottomNavigation />
    </div>
  );
}

export default Layout;
