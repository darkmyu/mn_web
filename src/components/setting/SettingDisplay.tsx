'use client';

import { LucideMonitor, LucideMoon, LucideSun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function SettingDisplay() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-fade-in" />;
  }

  return (
    <div className="animate-fade-in flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">테마</label>
          <p className="text-xs text-zinc-500">화면의 전체적인 테마를 설정할 수 있어요.</p>
        </div>
        <div className="flex w-fit min-w-80 items-center rounded-lg bg-zinc-100 p-1.5 max-lg:w-full dark:bg-zinc-800">
          <button
            onClick={() => setTheme('light')}
            className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              theme === 'light'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {theme === 'light' && (
              <motion.div
                layoutId="active-theme-bg"
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-zinc-700"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <LucideSun className="relative z-10 h-4 w-4" />
            <span className="relative z-10">라이트</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {theme === 'dark' && (
              <motion.div
                layoutId="active-theme-bg"
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-zinc-700"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <LucideMoon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">다크</span>
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              theme === 'system'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {theme === 'system' && (
              <motion.div
                layoutId="active-theme-bg"
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-zinc-700"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <LucideMonitor className="relative z-10 h-4 w-4" />
            <span className="relative z-10">시스템</span>
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

export default SettingDisplay;
