'use client';

import { $api } from '@/api';
import { useMasonryLayout } from '@/hooks/useMasonryLayout';
import Image from 'next/image';

interface Props {
  username: string;
}

function ProfileAnimalPhotoGrid({ username }: Props) {
  const { data } = $api.useQuery('get', '/api/v1/profiles/{username}/photos', {
    params: {
      path: {
        username,
      },
    },
  });

  const { containerRef, layout } = useMasonryLayout({
    dimensions:
      data?.items.map((item) => ({
        id: item.id,
        width: item.image.width,
        height: item.image.height,
      })) ?? [],
  });

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative" style={{ height: layout.height }}>
        {data?.items.map((item, index) => {
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
              <Image src={item.image.path} alt="" fill sizes="25vw" priority={index < 4} className="object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileAnimalPhotoGrid;
