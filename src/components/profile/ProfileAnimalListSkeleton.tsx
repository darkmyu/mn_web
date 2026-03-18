function ProfileAnimalListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`flex animate-pulse items-center gap-3 rounded-lg bg-zinc-100 p-1.5 pr-4 dark:bg-zinc-800 ${index > 0 ? 'max-lg:hidden' : ''}`}
        >
          <div className="size-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileAnimalListSkeleton;
