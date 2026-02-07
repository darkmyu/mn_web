'use client';

import dynamic from 'next/dynamic';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';

const SidebarFooter = dynamic(() => import('./SidebarFooter'), { ssr: false });

function Sidebar() {
  return (
    <nav className="sticky top-0 hidden h-dvh w-16 grid-rows-[1fr_minmax(0,auto)_1fr] items-center justify-items-center border-r border-zinc-200 py-8 lg:grid dark:border-zinc-700">
      <SidebarHeader />
      <div className="grid h-full content-start" />
      <SidebarMenu />
      <SidebarFooter />
    </nav>
  );
}

export default Sidebar;
