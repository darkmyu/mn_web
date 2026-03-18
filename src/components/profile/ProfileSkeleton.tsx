function ProfileSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 max-lg:gap-6">
      <div className="flex flex-col gap-8 max-lg:flex-row max-lg:items-center max-lg:gap-4">
        <div className="size-70 shrink-0 rounded-full bg-zinc-200 max-lg:size-16 dark:bg-zinc-800" />
        <div className="flex flex-col gap-2 max-lg:gap-1.5">
          <div className="h-8 w-32 rounded bg-zinc-200 max-lg:h-5 max-lg:w-24 dark:bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-20 rounded bg-zinc-200 max-lg:h-4 max-lg:w-16 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-300 dark:text-zinc-700">•</span>
            <div className="h-5 w-20 rounded bg-zinc-200 max-lg:h-4 max-lg:w-16 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-lg:px-2">
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-[38px] w-full rounded-lg bg-zinc-200 max-lg:h-[46px] dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export default ProfileSkeleton;
