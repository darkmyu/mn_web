import ProfilePhotoCommentListSkeleton from './ProfilePhotoCommentListSkeleton';

function ProfilePhotoCommentContainerSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-6 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
          <div className="flex items-start gap-4">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="min-h-10 flex-1 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <div className="h-4 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-8 w-12 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
        <ProfilePhotoCommentListSkeleton />
      </div>
    </div>
  );
}

export default ProfilePhotoCommentContainerSkeleton;
