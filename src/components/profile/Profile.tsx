import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import Image from 'next/image';
import Link from 'next/link';

function Profile() {
  return (
    <div className="flex gap-16">
      <div className="relative h-54 w-54 rounded-full border-2 border-zinc-400 dark:border-zinc-600">
        <Image
          className="rounded-full object-cover"
          src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
          sizes="25vw"
          alt=""
          fill
        />
      </div>
      <div className="flex flex-col py-2">
        <div className="mb-2 flex items-center gap-4">
          <p className="text-2xl font-medium">밤뮤</p>
          <Link
            href={ROUTE_SETTINGS_PAGE}
            className="rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            프로필 편집
          </Link>
        </div>
        <div className="mb-6 flex items-center">
          <p className="text-base font-semibold">@bammyu</p>
          <span className="mx-3 text-xs text-zinc-600">•</span>
          <p className="text-base">
            <span className="font-semibold">1,203</span> 팔로워
          </p>
          <span className="mx-3 text-xs text-zinc-600">•</span>
          <p className="text-base">
            <span className="font-semibold">4,002</span> 팔로우
          </p>
        </div>
        <p className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400">
          빵이, 빵삼, 빵구의 행복한 순간을 모아두는 저장소
        </p>
      </div>
    </div>
  );
}

export default Profile;
