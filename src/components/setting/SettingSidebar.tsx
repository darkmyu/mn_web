'use client';

import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { LucideCircleUserRound, LucidePalette, LucideUserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SettingSidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  return (
    <nav className="sticky top-16 flex w-full flex-col gap-8 max-lg:static max-lg:gap-4 max-lg:border-b max-lg:border-zinc-200 max-lg:pb-4 max-lg:dark:border-zinc-700">
      <div className="flex flex-col gap-3 max-lg:flex-row max-lg:justify-center">
        <Link
          href={`${ROUTE_SETTINGS_PAGE}?tab=profile`}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 ${activeTab === 'profile' ? 'bg-zinc-100 dark:bg-zinc-700/40' : 'hover:bg-zinc-100 hover:dark:bg-zinc-700/40'}`}
        >
          <LucideUserRoundPen className="size-4" />
          <span className="font-medium">프로필</span>
        </Link>
        <Link
          href={`${ROUTE_SETTINGS_PAGE}?tab=account`}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 ${activeTab === 'account' ? 'bg-zinc-100 dark:bg-zinc-700/40' : 'hover:bg-zinc-100 hover:dark:bg-zinc-700/40'}`}
        >
          <LucideCircleUserRound className="size-4" />
          <span className="font-medium">내 계정</span>
        </Link>
        <Link
          href={`${ROUTE_SETTINGS_PAGE}?tab=display`}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 ${activeTab === 'display' ? 'bg-zinc-100 dark:bg-zinc-700/40' : 'hover:bg-zinc-100 hover:dark:bg-zinc-700/40'}`}
        >
          <LucidePalette className="size-4" />
          <span className="font-medium">디스플레이</span>
        </Link>
      </div>
    </nav>
  );
}

export default SettingSidebar;
