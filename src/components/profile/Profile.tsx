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
    <div className="flex flex-col gap-4 max-lg:gap-6">
      <div className="flex flex-col gap-8 max-lg:flex-row max-lg:items-center max-lg:gap-4">
        <div className="flex size-70 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-400 max-lg:size-16 dark:border-zinc-600">
          <Image
            className="size-full object-cover"
            src={optimizeImage({ src: target.thumbnail ?? '', width: 280 })}
            alt=""
            width={280}
            height={280}
            priority
          />
        </div>
        <div className="flex flex-col gap-2 max-lg:gap-1">
          <p className="text-2xl font-bold max-lg:text-base">{target.nickname}</p>
          <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-300">
            <Link href={`/@${target.username}?tab=followers`} className="text-base max-lg:text-sm">
              <span className="font-semibold">{formatNumber(target.followers)}</span> 팔로워
            </Link>
            <span className="text-xs text-zinc-600">•</span>
            <Link href={`/@${target.username}?tab=followings`} className="text-base max-lg:text-sm">
              <span className="font-semibold">{formatNumber(target.followings)}</span> 팔로우
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {target.about && (
          <p className="flex items-center gap-2 text-sm text-zinc-700 max-lg:px-2 dark:text-zinc-400">{target.about}</p>
        )}
        {target.isOwner && (
          <button
            onClick={handleSettingButtonClick}
            className="cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-200/40 max-lg:py-3 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            프로필 편집
          </button>
        )}
        {!target.isOwner && (
          <button
            onClick={handleFollowButtonClick}
            className="cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-200/40 max-lg:py-3 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            {target.isFollowing ? '팔로우 중' : '팔로우'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
