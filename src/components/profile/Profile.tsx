'use client';

import {
  getProfileControllerReadQueryKey,
  profileControllerReadResponse200,
  useProfileControllerFollow,
  useProfileControllerReadSuspense,
  useProfileControllerUnfollow,
} from '@/api/profile';
import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useDialogStore } from '@/stores/dialog';
import { formatNumber } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  username: string;
}

function Profile({ username }: Props) {
  const {
    data: { data: target },
  } = useProfileControllerReadSuspense(username);

  const { user } = useAuthStore();
  const { setIsAuthDialogOpen } = useDialogStore();

  const queryKey = getProfileControllerReadQueryKey(username);

  const { mutate: followMutate } = useProfileControllerFollow({
    mutation: {
      onMutate: async (_, context) => {
        await context.client.cancelQueries({ queryKey });

        const previousFollows = context.client.getQueryData<profileControllerReadResponse200>(queryKey);

        context.client.setQueryData<profileControllerReadResponse200>(queryKey, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              isFollowing: true,
              followers: prev.data.isFollowing ? prev.data.followers : prev.data.followers + 1,
            },
          };
        });

        return { previousFollows };
      },
    },
  });

  const { mutate: unfollowMutate } = useProfileControllerUnfollow({
    mutation: {
      onMutate: async (_, context) => {
        await context.client.cancelQueries({ queryKey });

        const previousFollows = context.client.getQueryData<profileControllerReadResponse200>(queryKey);

        context.client.setQueryData<profileControllerReadResponse200>(queryKey, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              isFollowing: false,
              followers: !prev.data.isFollowing ? prev.data.followers : prev.data.followers - 1,
            },
          };
        });

        return { previousFollows };
      },
    },
  });

  const handleFollowButtonClick = () => {
    if (!user) return setIsAuthDialogOpen(true);

    if (!target.isFollowing) {
      followMutate({ username });
    } else {
      unfollowMutate({ username });
    }
  };

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
          {target.isOwner && (
            <Link
              href={ROUTE_SETTINGS_PAGE}
              className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              프로필 편집
            </Link>
          )}
          {!target.isOwner && (
            <button
              className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              onClick={handleFollowButtonClick}
            >
              {target.isFollowing ? '팔로우 중' : '팔로우'}
            </button>
          )}
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
