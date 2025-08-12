import Image from 'next/image';
import { FluentHeartIcon } from '../vector';

function RankingCard() {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
          alt=""
          fill
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold text-white">빵이</span>
              <div className="w-fit cursor-pointer rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                말티폼
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-sm text-white/80">
                <div className="font-medium">2025.08.08</div>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <FluentHeartIcon width={16} height={16} className="text-red-400" />
                <span className="text-sm font-medium">230</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingCard;
