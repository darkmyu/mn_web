import { ROUTE_PHOTOS_WRITE_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { LucideCamera, LucideImage } from 'lucide-react';
import Link from 'next/link';

interface Props {
  username: string;
}

function ProfilePhotoEmpty({ username }: Props) {
  const { user } = useAuthStore();
  const isOwner = user?.username === username;

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-0 lg:flex-0 lg:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        {isOwner ? (
          <LucideCamera className="h-8 w-8 text-zinc-400" />
        ) : (
          <LucideImage className="h-8 w-8 text-zinc-400" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">등록된 사진이 없어요</h3>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {isOwner ? '반려동물의 귀여운 모습을 자랑해보세요!' : '기다리다 보면 심쿵할 사진이 올라올지도 몰라요!'}
      </p>
      {isOwner && (
        <Link
          href={ROUTE_PHOTOS_WRITE_PAGE}
          className="mt-6 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          사진 업로드하기
        </Link>
      )}
    </div>
  );
}

export default ProfilePhotoEmpty;
