'use client';

import { usePhotoControllerLike, usePhotoControllerUnlike } from '@/api/photo';
import {
  getProfileControllerPhotoQueryKey,
  profileControllerPhotoResponseSuccess,
  useProfileControllerFollow,
  useProfileControllerPhotoSuspense,
  useProfileControllerUnfollow,
} from '@/api/profile';
import { useAuthStore } from '@/stores/auth';
import { useDialogStore } from '@/stores/dialog';
import { formatAge, formatNumber } from '@/utils/formatters';
import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'es-toolkit';
import { LucideCat, LucideDog, LucideEllipsisVertical, LucideHeart, LucideShare2 } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import toast from 'react-hot-toast';

interface Props {
  id: number;
  username: string;
}

function ProfilePhotoViewer({ id, username }: Props) {
  const {
    data: { data: photo },
  } = useProfileControllerPhotoSuspense(username, id);

  const { user } = useAuthStore();
  const { setIsAuthDialogOpen } = useDialogStore();

  const isOwner = user?.username === username;

  const queryClient = useQueryClient();
  const queryKey = getProfileControllerPhotoQueryKey(username, id);

  const initialLikedRef = useRef(photo.liked);
  const initialIsFollowingRef = useRef(photo.author.isFollowing);

  const { mutate: likeMutate } = usePhotoControllerLike();
  const { mutate: unlikeMutate } = usePhotoControllerUnlike();
  const { mutate: followMutate } = useProfileControllerFollow();
  const { mutate: unfollowMutate } = useProfileControllerUnfollow();

  const debouncedToggleLike = useMemo(
    () =>
      debounce((nextIsLiked: boolean) => {
        if (nextIsLiked === initialLikedRef.current) return;

        if (nextIsLiked) {
          likeMutate({ id });
        } else {
          unlikeMutate({ id });
        }

        initialLikedRef.current = nextIsLiked;
      }, 500),
    [id, likeMutate, unlikeMutate],
  );

  const debouncedToggleFollow = useMemo(
    () =>
      debounce((nextIsFollowing: boolean) => {
        if (nextIsFollowing === initialIsFollowingRef.current) return;

        if (nextIsFollowing) {
          followMutate({ username });
        } else {
          unfollowMutate({ username });
        }

        initialLikedRef.current = nextIsFollowing;
      }, 500),
    [followMutate, unfollowMutate, username],
  );

  const handleLikeButtonClick = () => {
    if (!user) return setIsAuthDialogOpen(true);

    const nextIsLiked = !photo.liked;

    queryClient.setQueryData<profileControllerPhotoResponseSuccess>(queryKey, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          liked: nextIsLiked,
          likes: nextIsLiked ? prev.data.likes + 1 : prev.data.likes - 1,
        },
      };
    });

    debouncedToggleLike(nextIsLiked);
  };

  const handleFollowButtonClick = () => {
    if (!user) return setIsAuthDialogOpen(true);

    const nextIsFollowing = !photo.author.isFollowing;

    queryClient.setQueryData<profileControllerPhotoResponseSuccess>(queryKey, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          author: {
            ...prev.data.author,
            isFollowing: nextIsFollowing,
            followers: nextIsFollowing ? prev.data.author.followers + 1 : prev.data.author.followers - 1,
          },
        },
      };
    });

    debouncedToggleFollow(nextIsFollowing);
  };

  const handleShareButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('주소가 복사되었어요!');
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 py-16">
      <div className="flex flex-col gap-24">
        <div className="relative grid grid-cols-4">
          <div className="absolute inset-0 opacity-35 blur-3xl">
            <Image className="object-cover" src={photo.image.path} alt="" sizes="50vw" fill priority />
          </div>
          <div
            className="relative col-span-2 col-start-2"
            style={{ aspectRatio: photo.image.width / photo.image.height }}
          >
            <Image className="rounded-lg object-contain" src={photo.image.path} alt="" sizes="50vw" fill priority />
          </div>
        </div>
        <div className="flex flex-col">
          {photo.title && <p className="mb-6 border-b-1 border-zinc-200 pb-2 text-2xl font-semibold">{photo.title}</p>}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {photo.author.profileImage && (
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image className="object-cover" src={photo.author.profileImage} alt="" width={40} height={40} />
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{photo.author.nickname}</span>
                  {!isOwner && (
                    <button
                      className="cursor-pointer rounded-lg border border-zinc-300 px-1.5 py-0.5 text-xs font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                      onClick={handleFollowButtonClick}
                    >
                      {photo.author.isFollowing ? '팔로우 중' : '팔로우'}
                    </button>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{`@${photo.author.username}`}</span>
                  <span className="mx-1 text-sm text-zinc-500 dark:text-zinc-400">•</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{`${formatNumber(photo.author.followers)} 팔로워`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800"
                onClick={handleLikeButtonClick}
              >
                {!photo.liked && <LucideHeart className="text-zinc-500 dark:text-zinc-400" />}
                {photo.liked && <LucideHeart className="fill-red-500" strokeWidth={0} />}
                <p className="font-medium text-zinc-500 dark:text-zinc-400">{photo.likes}</p>
              </button>
              <button
                className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800"
                onClick={handleShareButtonClick}
              >
                <LucideShare2 className="text-zinc-500 dark:text-zinc-400" />
              </button>
              <button className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                <LucideEllipsisVertical className="text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {photo.animals.map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-800"
                >
                  {animal.thumbnail && (
                    <div className="h-5 w-5 overflow-hidden rounded-full">
                      <Image src={animal.thumbnail} alt="" width={20} height={20} className="object-cover" />
                    </div>
                  )}
                  {!animal.thumbnail && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                      {animal.breed.species === 'DOG' && (
                        <LucideDog className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                      )}
                      {animal.breed.species === 'CAT' && (
                        <LucideCat className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                      )}
                    </div>
                  )}
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                    {`${animal.name} • ${formatAge(animal.birthday)} • ${animal.breed.name}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-zinc-200/40 p-4 dark:bg-zinc-800">
              <div className="mb-3 flex flex-col gap-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium">조회수 8.5만회</p>
                  <p className="mx-1 text-sm font-medium">•</p>
                  <p className="text-sm font-medium">2개월 전</p>
                </div>
                {photo.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {photo.tags.map((tag) => (
                      <span key={tag.name} className="cursor-pointer text-sm text-emerald-700 dark:text-emerald-300">
                        {`#${tag.name}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {photo.description && <div className="text-sm whitespace-pre-wrap">{photo.description}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoViewer;
