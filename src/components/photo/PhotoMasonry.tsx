import { PhotoResponse } from '@/api/index.schemas';
import { optimizeImage } from '@/utils/optimizeImage';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from '../masonry/Masonry';

interface Props {
  photos: PhotoResponse[];
}

function PhotoMasonry({ photos }: Props) {
  const dimensions = photos.map((photo) => ({
    id: photo.id,
    width: photo.image.width,
    height: photo.image.height,
  }));

  return (
    <Masonry
      items={photos}
      dimensions={dimensions}
      renderItem={(item, style) => (
        <Link
          key={item.id}
          scroll={false}
          href={`/profile/${item.author.profile.username}/photos/${item.id}`}
          className="cursor-pointer overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
          style={style}
        >
          <Image src={optimizeImage({ src: item.image.path, width: 480 })} alt="" sizes="25vw" fill priority />
        </Link>
      )}
    />
  );
}

export default PhotoMasonry;
