'use client';

import { useMasonryLayout } from '@/hooks/useMasonryLayout';

interface Props {
  count?: number;
}

const SKELETON_RATIOS = [1, 1.25, 1.5, 0.75, 1.2, 0.8, 1.4, 1.1, 0.9, 1.3];

function PhotoMasonrySkeleton({ count = 10 }: Props) {
  const dimensions = Array.from({ length: count }).map((_, index) => ({
    id: index,
    width: 100,
    height: 100 * (SKELETON_RATIOS[index % SKELETON_RATIOS.length] ?? 1),
  }));

  const { containerRef, layout } = useMasonryLayout({ dimensions });

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative" style={{ height: layout.height }}>
        {dimensions.map((item) => {
          const position = layout.positions[item.id];
          if (!position) return null;

          return (
            <div
              key={item.id}
              className="absolute animate-pulse overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
              style={{
                width: position.width,
                height: position.height,
                transform: `translate(${position.left}px, ${position.top}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PhotoMasonrySkeleton;
