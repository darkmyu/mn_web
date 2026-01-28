function ProfilePhotoViewerSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl animate-pulse flex-col gap-16 py-16">
      <div className="flex flex-col gap-24">
        <div className="relative grid grid-cols-4">
          <div className="col-span-2 col-start-2 aspect-square rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="flex flex-col">
          <div className="mb-6 h-10 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-12 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-10 w-10 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-10 w-10 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-7 w-40 rounded-full bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-7 w-32 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-zinc-200/40 p-4 dark:bg-zinc-800">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700/50" />
                <div className="flex gap-2">
                  <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700/50" />
                  <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700/50" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700/50" />
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700/50" />
                <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoViewerSkeleton;
