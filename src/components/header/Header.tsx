'use client';

import HeaderService from '@/components/header/HeaderService';
import dynamic from 'next/dynamic';

const HeaderThemeSwitch = dynamic(() => import('@/components/header/HeaderThemeSwitch'), { ssr: false });
const HeaderProfile = dynamic(() => import('./HeaderProfile'), { ssr: false });

function Header() {
  return (
    <header className={'grid grid-cols-[1fr_min(1280px,100%)_1fr]'}>
      <div className={'col-2 flex h-17 items-center justify-between'}>
        <div className={'flex items-center gap-16'}>
          <h1 className={'cursor-pointer text-xl font-bold'}>멍냥탑</h1>
          <HeaderService />
        </div>
        <div className={'flex items-center gap-6'}>
          <HeaderThemeSwitch />
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}

export default Header;
