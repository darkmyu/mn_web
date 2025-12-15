import { PhotoResponse } from '@/api/index.schemas';
import { useMasonryLayout } from '@/hooks/useMasonryLayout';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  photos: PhotoResponse[];
  children: React.ReactNode;
}

function PhotoMasonry({ photos, children }: Props) {
  const router = useRouter();

  const { containerRef, layout } = useMasonryLayout({
    dimensions: photos.map((photo) => ({
      id: photo.id,
      width: photo.image.width,
      height: photo.image.height,
    })),
  });

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative" style={{ height: layout.height }}>
        {photos.map((photo) => {
          const position = layout.positions[photo.id];

          return (
            <div
              key={photo.id}
              onClick={() => router.push(`/@${photo.author.username}/photos/${photo.id}`)}
              className="absolute cursor-pointer overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800"
              style={{
                width: position?.width ?? 0,
                height: position?.height ?? 0,
                transform: `translate(${position?.left ?? 0}px, ${position?.top ?? 0}px)`,
              }}
            >
              <Image src={photo.image.path} alt="" fill sizes="25vw" className="object-cover" />
            </div>
          );
        })}
      </div>
      {layout.height > 0 && children}
    </div>
  );
}

export default PhotoMasonry;
