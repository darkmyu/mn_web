'use client';

import Masonry from './Masonry';

interface Props {
  count?: number;
}

const SKELETON_RATIOS = [1, 1.25, 1.5, 0.75, 1.2, 0.8, 1.4, 1.1, 0.9, 1.3];

function MasonrySkeleton({ count = 10 }: Props) {
  const dimensions = Array.from({ length: count }).map((_, index) => ({
    id: index,
    width: 100,
    height: 100 * (SKELETON_RATIOS[index % SKELETON_RATIOS.length] ?? 1),
  }));

  return (
    <Masonry
      items={dimensions}
      dimensions={dimensions}
      renderItem={(item, style) => (
        <div
          key={item.id}
          style={style}
          className="animate-pulse overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
        />
      )}
    />
  );
}

export default MasonrySkeleton;
