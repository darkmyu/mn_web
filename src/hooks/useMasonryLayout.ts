import { useEffect, useMemo, useRef, useState } from 'react';

interface UseMasonryLayoutOptions<T extends { id: number }> {
  items: T[];
  gap?: number;
  minColumnCount?: number;
  minColumnWidth?: number;
}

export function useMasonryLayout<T extends { id: number }>({
  items,
  gap = 16,
  minColumnCount = 2,
  minColumnWidth = 272,
}: UseMasonryLayoutOptions<T>) {
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
    if (!containerWidth) {
      return { positions: {}, height: 0 };
    }

    const columnCount = Math.max(minColumnCount, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
    const columnHeights = new Array(columnCount).fill(0);
    const positions: Record<number, { left: number; top: number; width: number; height: number }> = {};
    let maxHeight = 0;

    for (const item of items) {
      const ratio = aspectRatios[item.id] ?? 1;
      const height = columnWidth * ratio;

      const targetIndex = columnHeights.indexOf(Math.min(...columnHeights));
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
  }, [aspectRatios, containerWidth, gap, items, minColumnCount, minColumnWidth]);

  const measureImage = (id: number, naturalWidth: number, naturalHeight: number) => {
    const ratio = naturalHeight / naturalWidth;
    setAspectRatios((prev) => {
      if (prev[id] && Math.abs(prev[id] - ratio) < 0.01) {
        return prev;
      }
      return { ...prev, [id]: ratio };
    });
  };

  return {
    containerRef,
    layout,
    measureImage,
  };
}
