import { useEffect, useMemo, useRef, useState } from 'react';

export interface MasonryDimension {
  width: number;
  height: number;
}

interface MasonryPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface MasonryOptions {
  dimensions: MasonryDimension[];
  gap?: number;
  minColumnCount?: number;
  minColumnWidth?: number;
}

export function useMasonryLayout({ dimensions, gap = 16, minColumnCount = 2, minColumnWidth = 272 }: MasonryOptions) {
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
    const columnCount = Math.max(minColumnCount, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
    const columnHeights = new Array(columnCount).fill(0);
    const positions: MasonryPosition[] = [];
    let maxHeight = 0;

    for (const dimension of dimensions) {
      const ratio = dimension.height / dimension.width;
      const height = columnWidth * ratio;

      const targetIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const left = targetIndex * (columnWidth + gap);
      const top = columnHeights[targetIndex];

      positions.push({ left, top, width: columnWidth, height });
      columnHeights[targetIndex] += height + gap;
      maxHeight = Math.max(maxHeight, columnHeights[targetIndex]);
    }

    return {
      positions,
      height: Math.max(0, maxHeight - gap),
    };
  }, [containerWidth, dimensions, gap, minColumnCount, minColumnWidth]);

  return {
    containerRef,
    layout,
  };
}
