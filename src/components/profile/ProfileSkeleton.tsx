function ProfileSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center gap-8 lg:flex-row lg:gap-16">
      <div className="h-32 w-32 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex w-full flex-col items-center gap-6 py-2 lg:w-auto lg:items-start">
        <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:items-start lg:gap-2">
          <div className="flex items-center justify-center gap-4 lg:justify-start">
            <div className="h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="flex items-center">
            <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
            <span className="mx-3 text-xs text-zinc-600">•</span>
            <div className="h-6 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
            <span className="mx-3 text-xs text-zinc-600">•</span>
            <div className="h-6 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="h-5 w-3/4 rounded bg-zinc-200 lg:w-96 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export default ProfileSkeleton;
