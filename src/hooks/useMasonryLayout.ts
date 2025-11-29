import { FileResponse } from '@/api/types';
import { useEffect, useMemo, useRef, useState } from 'react';

interface UseMasonryLayoutOptions<T extends { id: number }> {
  items: T[];
  sizes: FileResponse[];
  gap?: number;
  minColumnCount?: number;
  minColumnWidth?: number;
}

export function useMasonryLayout<T extends { id: number }>({
  items,
  sizes,
  gap = 16,
  minColumnCount = 2,
  minColumnWidth = 272,
}: UseMasonryLayoutOptions<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
    if (!containerWidth) {
      return { positions: {}, height: 0 };
    }

    const columnCount = Math.max(minColumnCount, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
    const columnHeights = new Array(columnCount).fill(0);
    const positions: Record<number, { left: number; top: number; width: number; height: number }> = {};
    let maxHeight = 0;

    items.forEach((item, index) => {
      const size = sizes[index];
      if (!size) return;

      const ratio = size.height / size.width;
      const height = columnWidth * ratio;

      const targetIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const left = targetIndex * (columnWidth + gap);
      const top = columnHeights[targetIndex];

      positions[item.id] = { left, top, width: columnWidth, height };
      columnHeights[targetIndex] += height + gap;
      maxHeight = Math.max(maxHeight, columnHeights[targetIndex]);
    });

    return {
      positions,
      height: Math.max(0, maxHeight - gap),
    };
  }, [containerWidth, gap, items, minColumnCount, minColumnWidth, sizes]);

  return {
    containerRef,
    layout,
  };
}
