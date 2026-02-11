'use client';

import PhotoMasonrySkeleton from '../photo/PhotoMasonrySkeleton';

function TagPhotoMasonrySkeleton() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-1">
        <div className="h-8 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-48 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <PhotoMasonrySkeleton count={30} />
    </div>
  );
}

export default TagPhotoMasonrySkeleton;
