function ProfileAnimalListSkeleton() {
  return (
    <div className="flex items-stretch gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-3 rounded-full bg-zinc-100 p-1.5 pr-8 dark:bg-zinc-800"
        >
          <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-700" />
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
