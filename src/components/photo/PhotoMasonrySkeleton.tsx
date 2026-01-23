'use client';

interface Props {
  count?: number;
}

const SKELETON_RATIOS = [1, 1.25, 1.5, 0.75, 1.2, 0.8, 1.4, 1.1, 0.9, 1.3];

function PhotoMasonrySkeleton({ count = 10 }: Props) {
  return (
    <div className="w-full columns-[272px] gap-4">
      {Array.from({ length: count }).map((_, index) => {
        const ratio = SKELETON_RATIOS[index % SKELETON_RATIOS.length] ?? 1;

        return (
          <div
            key={index}
            className="mb-4 animate-pulse break-inside-avoid overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
            style={{
              aspectRatio: `1 / ${ratio}`,
            }}
          />
        );
      })}
    </div>
  );
}

export default PhotoMasonrySkeleton;
