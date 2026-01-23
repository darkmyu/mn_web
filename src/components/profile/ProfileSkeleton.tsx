function ProfileSkeleton() {
  return (
    <div className="flex animate-pulse gap-16">
      <div className="h-32 w-32 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex w-full flex-col py-2">
        <div className="mb-2 flex items-center gap-4">
          <div className="h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="mb-6 flex items-center">
          <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
          <span className="mx-3 text-xs text-zinc-600">•</span>
          <div className="h-6 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          <span className="mx-3 text-xs text-zinc-600">•</span>
          <div className="h-6 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export default ProfileSkeleton;
