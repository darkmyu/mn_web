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
    return <div className="animate-fade-in p-8" />;
  }

  return (
    <div className="animate-fade-in p-8">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">테마</label>
        <div className="flex w-fit min-w-80 items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
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
            <span className="relative z-10">자동</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingDisplay;
