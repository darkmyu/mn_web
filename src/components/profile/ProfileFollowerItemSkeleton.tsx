function ProfileFollowerItemSkeleton() {
  return (
    <div className="flex animate-pulse items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="h-4 w-24 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-32 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="h-8 w-20 shrink-0 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}

export default ProfileFollowerItemSkeleton;
