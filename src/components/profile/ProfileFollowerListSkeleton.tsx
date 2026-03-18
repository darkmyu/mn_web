import ProfileFollowerItemSkeleton from './ProfileFollowerItemSkeleton';

function ProfileFollowerListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="h-6 w-32 animate-pulse rounded-md bg-zinc-200 lg:h-7 dark:bg-zinc-700" />
      <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProfileFollowerItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default ProfileFollowerListSkeleton;
