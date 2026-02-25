import { PhotoResponse } from '@/api/index.schemas';
import { useMasonryLayout } from '@/hooks/useMasonryLayout';
import { useScrollStore } from '@/stores/scroll';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  photos: PhotoResponse[];
  children?: React.ReactNode;
  isFetchingNextPage?: boolean;
}

const SKELETON_COUNT = 10;
const SKELETON_RATIOS = [1, 1.25, 1.5, 0.75, 1.2, 0.8, 1.4, 1.1, 0.9, 1.3];

function PhotoMasonry({ photos, children, isFetchingNextPage = false }: Props) {
  const pathname = usePathname();
  const { setScrollPosition, getScrollPosition } = useScrollStore();

  const photoDimensions = photos.map((photo) => ({
    id: photo.id,
    width: photo.image.width,
    height: photo.image.height,
  }));

  const skeletonDimensions = isFetchingNextPage
    ? Array.from({ length: SKELETON_COUNT }).map((_, index) => ({
        id: -1 * (index + 1),
        width: 100,
        height: 100 * (SKELETON_RATIOS[index % SKELETON_RATIOS.length] ?? 1),
      }))
    : [];

  const dimensions = [...photoDimensions, ...skeletonDimensions];

  const { containerRef, layout } = useMasonryLayout({ dimensions });

  const handlePhotoClick = () => {
    setScrollPosition(pathname, window.scrollY);
  };

  useEffect(() => {
    if (layout.height > 0 && photos.length > 0) {
      const savedPosition = getScrollPosition(pathname);

      if (savedPosition) {
        requestAnimationFrame(() => {
          window.scrollTo(0, savedPosition);
        });
      }
    }
  }, [getScrollPosition, layout.height, pathname, photos.length]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative" style={{ height: layout.height }}>
        {photos.map((photo) => {
          const position = layout.positions[photo.id];
          if (!position) return null;

          return (
            <Link
              key={photo.id}
              onClick={handlePhotoClick}
              href={`/@${photo.author.username}/photos/${photo.id}`}
              className="absolute cursor-pointer overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
              style={{
                width: position.width,
                height: position.height,
                transform: `translate3d(${position.left}px, ${position.top}px, 0)`,
              }}
            >
              <Image src={photo.image.path} alt="" fill priority />
            </Link>
          );
        })}
        {skeletonDimensions.map((item) => {
          const position = layout.positions[item.id];
          if (!position) return null;

          return (
            <div
              key={item.id}
              className="absolute animate-pulse overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
              style={{
                width: position.width,
                height: position.height,
                transform: `translate3d(${position.left}px, ${position.top}px, 0)`,
              }}
            />
          );
        })}
      </div>
      {layout.height > 0 && children}
    </div>
  );
}

export default PhotoMasonry;
