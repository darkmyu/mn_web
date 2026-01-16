'use client';

import { useProfileControllerReadSuspense } from '@/api/profile';
import { formatNumber } from '@/utils/formatters';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ProfileActions = dynamic(() => import('./ProfileActions'), { ssr: false });

interface Props {
  username: string;
}

function Profile({ username }: Props) {
  const {
    data: { data: target },
  } = useProfileControllerReadSuspense(username);

  return (
    <div className="flex gap-16">
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-zinc-400 dark:border-zinc-600">
        <Image
          className="rounded-full object-cover"
          src={target.profileImage ?? ''}
          sizes="25vw"
          alt=""
          fill
          priority
        />
      </div>
      <div className="flex flex-col py-2">
        <div className="mb-2 flex items-center gap-4">
          <p className="text-2xl font-medium">{target.nickname}</p>
          <ProfileActions target={target} />
        </div>
        <div className="mb-6 flex items-center">
          <p className="text-base font-semibold">{`@${target.username}`}</p>
          <span className="mx-3 text-xs text-zinc-600">•</span>
          <p className="text-base">
            <span className="font-semibold">{formatNumber(target.followers)}</span> 팔로워
          </p>
          <span className="mx-3 text-xs text-zinc-600">•</span>
          <p className="text-base">
            <span className="font-semibold">{formatNumber(target.followings)}</span> 팔로우
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
