'use client';

import { ROUTE_HOME_LATEST_PAGE, ROUTE_HOME_PAGE } from '@/constants/route';
import { LucideClock8, LucideTrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function HomeTab() {
  const pathname = usePathname();

  const isPopular = pathname === ROUTE_HOME_PAGE;
  const isLatest = pathname === ROUTE_HOME_LATEST_PAGE;

  return (
    <div className="flex h-12 items-center justify-between">
      <div className="flex gap-4 self-stretch">
        <Link
          href={ROUTE_HOME_PAGE}
          className={`relative flex items-center gap-1.5 px-2 transition-colors ${
            isPopular ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <LucideTrendingUp className="h-6 w-6" />
          <span className="text-lg font-semibold">인기순</span>
          {isPopular && (
            <motion.div
              layoutId="active-tab"
              className="absolute right-0 bottom-0 left-0 h-0.5 bg-zinc-900 dark:bg-zinc-100"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </Link>
        <Link
          href={ROUTE_HOME_LATEST_PAGE}
          className={`relative flex items-center gap-1.5 px-2 transition-colors ${
            isLatest ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <LucideClock8 className="h-6 w-6" />
          <span className="text-lg font-semibold">최신순</span>
          {isLatest && (
            <motion.div
              layoutId="active-tab"
              className="absolute right-0 bottom-0 left-0 h-0.5 bg-zinc-900 dark:bg-zinc-100"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </Link>
      </div>
      <div>Popup</div>
    </div>
  );
}

export default HomeTab;
