'use client';

import {
  getProfileControllerReadQueryKey,
  profileControllerReadResponse200,
  useProfileControllerFollow,
  useProfileControllerReadSuspense,
  useProfileControllerUnfollow,
} from '@/api/profile';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { formatNumber } from '@/utils/formatters';
import { optimizeImage } from '@/utils/optimizeImage';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from '../modal/AuthModal';
import SettingModal from '../modal/SettingModal';

interface Props {
  username: string;
}

function Profile({ username }: Props) {
  const {
    data: { data: target },
  } = useProfileControllerReadSuspense(username);

  const modals = useModalStore();
  const { user } = useAuthStore();

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
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    if (!target.isFollowing) {
      followMutate({ username });
    } else {
      unfollowMutate({ username });
    }
  };

  const handleSettingButtonClick = async () => {
    await modals.push({
      key: 'setting-modal',
      component: SettingModal,
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
      <div className="flex size-32 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-400 dark:border-zinc-600">
        <Image
          className="size-full object-cover"
          src={optimizeImage({ src: target.thumbnail ?? '', width: 128 })}
          alt=""
          width={128}
          height={128}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-6 py-2 lg:items-start">
        <div className="flex flex-col gap-4 lg:gap-2">
          <div className="flex items-center justify-center gap-4 lg:justify-start">
            <p className="text-xl font-medium lg:text-2xl">{target.nickname}</p>
            {target.isOwner && (
              <button
                onClick={handleSettingButtonClick}
                className="cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-200/40 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                프로필 편집
              </button>
            )}
            {!target.isOwner && (
              <button
                onClick={handleFollowButtonClick}
                className="cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-200/40 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                {target.isFollowing ? '팔로우 중' : '팔로우'}
              </button>
            )}
          </div>
          <div className="flex items-center">
            <p className="text-base font-semibold">{`@${target.username}`}</p>
            <span className="mx-3 text-xs text-zinc-600">•</span>
            <Link href={`/@${target.username}?tab=followers`} className="text-base">
              <span className="font-semibold">{formatNumber(target.followers)}</span> 팔로워
            </Link>
            <span className="mx-3 text-xs text-zinc-600">•</span>
            <Link href={`/@${target.username}?tab=followings`} className="text-base">
              <span className="font-semibold">{formatNumber(target.followings)}</span> 팔로우
            </Link>
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400">{target.about}</p>
      </div>
    </div>
  );
}

export default Profile;
