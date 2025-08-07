import Image from 'next/image';
import { FluentHeartIcon } from '../vector';
import { DogPhoto } from './RankingGrid';

interface Props {
  photo: DogPhoto;
}

function RankingCard({ photo }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={photo.imageUrl}
          alt={`${photo.dogName} 사진`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />

        <div className="absolute inset-0 bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">{photo.dogName}</h3>
                {photo.breed && (
                  <span className="inline-block cursor-pointer rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                    {photo.breed}
                  </span>
                )}
              </div>
              <button className="cursor-pointer rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white">
                <FluentHeartIcon
                  width={20}
                  height={20}
                  className={`transition-colors duration-200 ${
                    photo.isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-700 hover:text-red-500'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-sm text-white/80">
                <div className="font-medium">{photo.ownerName}</div>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <FluentHeartIcon width={16} height={16} className="text-red-400" />
                <span className="text-sm font-medium">
                  {photo.voteCount > 999 ? `${Math.floor(photo.voteCount / 1000)}k` : photo.voteCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingCard;
