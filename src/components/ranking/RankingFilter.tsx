'use client';

import { useState } from 'react';

function RankingFilter() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);

  return (
    <div className="col-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex cursor-pointer items-center gap-1 p-2 text-sm font-bold text-emerald-600 transition-colors duration-200 dark:text-emerald-400">
            <span>🐾</span>
            <span>전체</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 p-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
            <span>🐶</span>
            <span>강아지</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 p-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
            <span>🐱</span>
            <span>고양이</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="flex cursor-pointer items-center gap-1 p-2 text-sm font-semibold text-zinc-500 transition-colors duration-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <span>오늘</span>
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${isPopoverOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isPopoverOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsPopoverOpen(false)}></div>
                <div className="absolute top-full right-0 z-20 w-24 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-emerald-600 transition-colors duration-150 dark:text-emerald-400">
                    오늘
                  </div>
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100">
                    이번 주
                  </div>
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100">
                    이번 달
                  </div>
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100">
                    올해
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <div
              onClick={() => setIsSortPopoverOpen(!isSortPopoverOpen)}
              className="flex cursor-pointer items-center gap-1 p-2 text-sm font-semibold text-zinc-500 transition-colors duration-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <span>최신순</span>
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${isSortPopoverOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isSortPopoverOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortPopoverOpen(false)}></div>
                <div className="absolute top-full right-0 z-20 w-20 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-emerald-600 transition-colors duration-150 dark:text-emerald-400">
                    최신순
                  </div>
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100">
                    인기순
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingFilter;
