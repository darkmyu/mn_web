'use client';

import Service from '@/components/layout/Service';
import dynamic from 'next/dynamic';

const ThemeSwitch = dynamic(() => import('@/components/theme/ThemeSwitch'), { ssr: false });

function Header() {
  return (
    <header className={'grid grid-cols-[1fr_min(1280px,100%)_1fr]'}>
      <div className={'col-2 flex h-17 items-center justify-between'}>
        <div className={'flex items-center gap-16'}>
          <h1 className={'cursor-pointer text-xl font-bold text-gray-900 dark:text-gray-50'}>멍냥탑</h1>
          <Service />
        </div>
        <div className={'flex items-center gap-6'}>
          <ThemeSwitch />
          <button
            className={
              'cursor-pointer rounded-lg bg-emerald-600 px-4.5 py-2.5 text-sm text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 dark:bg-emerald-800 dark:hover:bg-emerald-800/90'
            }
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
