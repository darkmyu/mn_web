'use client';

import { $api } from '@/api';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

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

  const gap = 16;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      setContainerWidth(entries[0].contentRect.width);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => {
    if (!containerWidth || !data?.items) {
      return { positions: {}, height: 0 };
    }

    const minColumnCount = 2;
    const minColumnWidth = 272;
    const columnCount = Math.max(minColumnCount, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
    const columnHeights = new Array(columnCount).fill(0);
    const positions: Record<number, { left: number; top: number; width: number; height: number }> = {};
    let maxHeight = 0;

    for (const item of data.items) {
      const ratio = aspectRatios[item.id] ?? 1;
      const height = columnWidth * ratio;

      let targetIndex = 0;
      for (let columnIndex = 1; columnIndex < columnCount; columnIndex += 1) {
        if (columnHeights[columnIndex] < columnHeights[targetIndex]) {
          targetIndex = columnIndex;
        }
      }

      const left = targetIndex * (columnWidth + gap);
      const top = columnHeights[targetIndex];

      positions[item.id] = { left, top, width: columnWidth, height };

      columnHeights[targetIndex] += height + gap;
      maxHeight = Math.max(maxHeight, columnHeights[targetIndex]);
    }

    return {
      positions,
      height: Math.max(0, maxHeight - gap),
    };
  }, [aspectRatios, containerWidth, data, gap]);

  const handleImageLoad = (key: number, naturalWidth: number, naturalHeight: number) => {
    const ratio = naturalHeight / naturalWidth;
    setAspectRatios((prev) => {
      if (prev[key] && Math.abs(prev[key] - ratio) < 0.01) {
        return prev;
      }
      return { ...prev, [key]: ratio };
    });
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div
        className="relative"
        style={{
          height: layout.height,
        }}
      >
        {data?.items.map((item) => {
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
              <Image
                src={item.image}
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
                onLoad={(e) => handleImageLoad(item.id, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileAnimalPhotoGrid;
