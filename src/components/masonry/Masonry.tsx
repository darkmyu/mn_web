import { MasonryDimension, useMasonryLayout } from '@/hooks/useMasonryLayout';
import { useEffect, useRef, useState } from 'react';

interface Props<T> {
  items: T[];
  dimensions: MasonryDimension[];
  renderItem: (item: T, style: React.CSSProperties) => React.ReactNode;
}

function Masonry<T>({ items, dimensions, renderItem }: Props<T>) {
  const { containerRef, layout } = useMasonryLayout({ dimensions });

  const rafId = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const bufferSize = viewportHeight / 2;
  const start = scrollY - bufferSize;
  const end = scrollY + viewportHeight + bufferSize;

  useEffect(() => {
    const update = () => {
      rafId.current = null;
      setScrollY(window.scrollY);
      setViewportHeight(window.innerHeight);
    };

    const handleEventListener = () => {
      if (rafId.current === null) {
        rafId.current = window.requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener('resize', handleEventListener);
    window.addEventListener('scroll', handleEventListener, { passive: true });

    return () => {
      window.removeEventListener('resize', handleEventListener);
      window.removeEventListener('scroll', handleEventListener);

      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: layout.height }}>
      {items.map((item, index) => {
        const position = layout.positions[index];
        if (!position) return null;

        const top = position.top;
        const bottom = top + position.height;
        const isVisible = bottom >= start && top <= end;
        if (!isVisible) return null;

        const style: React.CSSProperties = {
          position: 'absolute',
          width: position.width,
          height: position.height,
          transform: `translate3d(${position.left}px, ${position.top}px, 0)`,
        };

        return renderItem(item, style);
      })}
    </div>
  );
}

export default Masonry;
