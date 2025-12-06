'use client';

import { useProfileControllerPhotosSuspenseInfinite } from '@/api/profile';
import { useMasonryLayout } from '@/hooks/useMasonryLayout';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  username: string;
}

function ProfileAnimalPhotoGrid({ username }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProfileControllerPhotosSuspenseInfinite(
    username,
    {
      page: 1,
      limit: 20,
    },
    {
      query: {
        getNextPageParam: (lastPage) => (!lastPage.data.isLast ? lastPage.data.page + 1 : undefined),
      },
    },
  );

  const items = data.pages.flatMap((page) => page.data.items);

  const { containerRef, layout } = useMasonryLayout({
    dimensions: items.map((item) => ({
      id: item.id,
      width: item.image.width,
      height: item.image.height,
    })),
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative" style={{ height: layout.height }}>
        {items.map((item) => {
          const position = layout.positions[item.id];

          return (
            <div
              key={item.id}
              className="absolute overflow-hidden rounded-2xl bg-neutral-100"
              style={{
                width: position?.width ?? 0,
                height: position?.height ?? 0,
                transform: `translate(${position?.left ?? 0}px, ${position?.top ?? 0}px)`,
              }}
            >
              <Image src={item.image.path} alt="" fill sizes="25vw" className="object-cover" />
            </div>
          );
        })}
      </div>
      {layout.height > 0 && <div ref={ref} />}
    </div>
  );
}

export default ProfileAnimalPhotoGrid;
