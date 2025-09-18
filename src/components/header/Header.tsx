'use client';

import dynamic from 'next/dynamic';
import HeaderService from './HeaderService';

const HeaderUpload = dynamic(() => import('./HeaderUpload'), { ssr: false });
const HeaderThemeSwitch = dynamic(() => import('./HeaderThemeSwitch'), { ssr: false });
const HeaderProfile = dynamic(() => import('./HeaderProfile'), { ssr: false });

function Header() {
  return (
    <header className="col-2 flex h-17 items-center justify-between">
      <div className="flex items-center gap-16">
        <h1 className="cursor-pointer text-xl font-bold">멍냥탑</h1>
        <HeaderService />
      </div>
      <div className="flex items-center gap-6">
        <HeaderUpload />
        <HeaderThemeSwitch />
        <HeaderProfile />
      </div>
    </header>
  );
}

export default Header;
