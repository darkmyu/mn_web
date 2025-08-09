import { Popover } from 'radix-ui';

function RankingFilter() {
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
          <Popover.Root>
            <Popover.Trigger asChild>
              <div className="flex cursor-pointer items-center gap-1 p-2 text-sm font-semibold text-zinc-500 transition-colors duration-200 select-none hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 data-[state=open]:[&>svg]:rotate-180">
                <span>오늘</span>
                <svg
                  className="h-3 w-3 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content align="end">
                <div className="w-24 rounded-lg border border-zinc-200 bg-white shadow-lg select-none dark:border-zinc-700 dark:bg-zinc-800">
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
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <div className="flex cursor-pointer items-center gap-1 p-2 text-sm font-semibold text-zinc-500 transition-colors duration-200 select-none hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 data-[state=open]:[&>svg]:rotate-180">
                <span>인기순</span>
                <svg
                  className="h-3 w-3 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content align="end">
                <div className="w-20 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-emerald-600 transition-colors duration-150 dark:text-emerald-400">
                    인기순
                  </div>
                  <div className="w-full cursor-pointer px-4 py-3 text-left text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100">
                    최신순
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
}

export default RankingFilter;
