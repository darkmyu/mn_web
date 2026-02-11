'use client';

import { LucideMonitor, LucideMoon, LucideSun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function MobileSettingDisplay() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-6" />;
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">화면 설정</label>
          <p className="text-xs text-zinc-500">애플리케이션의 테마를 설정합니다.</p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-zinc-100 p-1.5 dark:bg-zinc-800">
          <button
            onClick={() => setTheme('light')}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 transition-all active:scale-[0.95] ${
              theme === 'light' ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'
            }`}
          >
            {theme === 'light' && (
              <motion.div
                layoutId="active-theme-bg-mobile"
                className="absolute inset-0 rounded-xl bg-white shadow-md dark:bg-zinc-700"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <LucideSun className="relative z-10 h-5 w-5" />
            <span className="relative z-10 text-xs font-bold">라이트</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 transition-all active:scale-[0.95] ${
              theme === 'dark' ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'
            }`}
          >
            {theme === 'dark' && (
              <motion.div
                layoutId="active-theme-bg-mobile"
                className="absolute inset-0 rounded-xl bg-white shadow-md dark:bg-zinc-700"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <LucideMoon className="relative z-10 h-5 w-5" />
            <span className="relative z-10 text-xs font-bold">다크</span>
          </button>

          <button
            onClick={() => setTheme('system')}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 transition-all active:scale-[0.95] ${
              theme === 'system' ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'
            }`}
          >
            {theme === 'system' && (
              <motion.div
                layoutId="active-theme-bg-mobile"
                className="absolute inset-0 rounded-xl bg-white shadow-md dark:bg-zinc-700"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <LucideMonitor className="relative z-10 h-5 w-5" />
            <span className="relative z-10 text-xs font-bold">시스템</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">미리보기</label>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800">
            <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="h-4 w-full animate-pulse rounded-full bg-zinc-50 dark:bg-zinc-800/50" />
            <div className="h-4 w-[80%] animate-pulse rounded-full bg-zinc-50 dark:bg-zinc-800/50" />
            <div className="mt-2 h-32 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSettingDisplay;
