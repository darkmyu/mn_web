'use client';

import { ProfileFollowResponse } from '@/api/index.schemas';
import { useProfileControllerFollow, useProfileControllerUnfollow } from '@/api/profile';
import AuthModal from '@/components/modal/AuthModal';
import { useIsClient } from '@/hooks/useIsClient';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { optimizeImage } from '@/utils/optimizeImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  follower: ProfileFollowResponse;
}

function ProfileFollowerItem({ follower }: Props) {
  const modals = useModalStore();
  const { user } = useAuthStore();
  const { isClient } = useIsClient();
  const [isFollowing, setIsFollowing] = useState(follower.isFollowing);

  const { mutate: followMutate } = useProfileControllerFollow({
    mutation: {
      onMutate: () => setIsFollowing(true),
    },
  });

  const { mutate: unfollowMutate } = useProfileControllerUnfollow({
    mutation: {
      onMutate: () => setIsFollowing(false),
    },
  });

  const handleFollowButtonClick = () => {
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    if (!isFollowing) {
      followMutate({ username: follower.username });
    } else {
      unfollowMutate({ username: follower.username });
    }
  };

  useEffect(() => {
    setIsFollowing(follower.isFollowing);
  }, [follower.isFollowing]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link href={`/@${follower.username}`} className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={optimizeImage({ src: follower.thumbnail ?? '', width: 40 })}
            className="size-full object-cover"
            width={40}
            height={40}
            alt=""
          />
        </Link>
        <Link href={`/@${follower.username}`} className="flex min-w-0 flex-col">
          <p className="truncate text-sm font-medium">{follower.nickname}</p>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{`@${follower.username}`}</p>
        </Link>
      </div>
      {isClient && !follower.isOwner && (
        <button
          onClick={handleFollowButtonClick}
          className="shrink-0 cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-200/40 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          {isFollowing ? '팔로우 중' : '팔로우'}
        </button>
      )}
    </div>
  );
}

export default ProfileFollowerItem;
