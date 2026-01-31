function ProfilePhotoReplyListSkeleton() {
  return (
    <div className="flex flex-col gap-12 pt-12">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-1">
              <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="flex gap-4 pt-1">
              <div className="h-4 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfilePhotoReplyListSkeleton;
