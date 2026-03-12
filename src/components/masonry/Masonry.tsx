import { MasonryDimension, useMasonryLayout } from '@/hooks/useMasonryLayout';

interface Props<T> {
  items: T[];
  dimensions: MasonryDimension[];
  renderItem: (item: T, style: React.CSSProperties) => React.ReactNode;
}

function Masonry<T>({ items, dimensions, renderItem }: Props<T>) {
  const { containerRef, layout } = useMasonryLayout({ dimensions });

  return (
    <div ref={containerRef} style={{ height: layout.height }}>
      {items.map((item, index) => {
        const position = layout.positions[index];
        if (!position) return null;

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
