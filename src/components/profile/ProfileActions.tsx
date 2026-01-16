import { ProfileResponse } from '@/api/index.schemas';
import {
  getProfileControllerReadQueryKey,
  profileControllerReadResponse200,
  useProfileControllerFollow,
  useProfileControllerUnfollow,
} from '@/api/profile';
import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'es-toolkit';
import Link from 'next/link';
import { useMemo, useRef } from 'react';

interface Props {
  target: ProfileResponse;
}

function ProfileActions({ target }: Props) {
  const { user } = useAuthStore();
  const isOwner = user?.username === target.username;

  const queryClient = useQueryClient();
  const queryKey = getProfileControllerReadQueryKey(target.username);

  const initialIsFollowingRef = useRef(target.isFollowing);

  const { mutate: followMutate } = useProfileControllerFollow();
  const { mutate: unfollowMutate } = useProfileControllerUnfollow();

  const debounceToggleFollow = useMemo(
    () =>
      debounce((nextIsFollowing: boolean) => {
        if (nextIsFollowing === initialIsFollowingRef.current) return;

        if (nextIsFollowing) {
          followMutate({ username: target.username });
        } else {
          unfollowMutate({ username: target.username });
        }

        initialIsFollowingRef.current = nextIsFollowing;
      }, 500),
    [followMutate, target.username, unfollowMutate],
  );

  const handleFollowButtonClick = () => {
    const nextIsFollowing = !target.isFollowing;

    queryClient.setQueryData<profileControllerReadResponse200>(queryKey, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          isFollowing: nextIsFollowing,
          followers: nextIsFollowing ? prev.data.followers + 1 : prev.data.followers - 1,
        },
      };
    });

    debounceToggleFollow(nextIsFollowing);
  };

  if (isOwner) {
    return (
      <Link
        href={ROUTE_SETTINGS_PAGE}
        className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        프로필 편집
      </Link>
    );
  }

  return (
    <button
      className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      onClick={handleFollowButtonClick}
    >
      {target.isFollowing ? '팔로우 중' : '팔로우'}
    </button>
  );
}

export default ProfileActions;
