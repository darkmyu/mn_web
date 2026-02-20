'use client';

import { usePhotoControllerDelete, usePhotoControllerLike, usePhotoControllerUnlike } from '@/api/photo';
import {
  getProfileControllerPhotoQueryKey,
  profileControllerPhotoResponse200,
  useProfileControllerFollow,
  useProfileControllerPhotoSuspense,
  useProfileControllerUnfollow,
} from '@/api/profile';
import { ROUTE_PHOTOS_WRITE_PAGE, ROUTE_TAGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { formatDate, formatNumber } from '@/utils/formatters';
import { Popover } from '@base-ui/react/popover';
import {
  LucideCat,
  LucideDog,
  LucideEllipsisVertical,
  LucideFlag,
  LucideHeart,
  LucideShare2,
  LucideSquarePen,
  LucideTrash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import AuthModal from '../modal/AuthModal';
import ConfirmModal from '../modal/ConfirmModal';
import ProfilePhotoViewerDescription from './ProfilePhotoViewerDescription';

interface Props {
  username: string;
  id: number;
}

function ProfilePhotoViewer({ username, id }: Props) {
  const {
    data: { data: photo },
  } = useProfileControllerPhotoSuspense(username, id);

  const router = useRouter();
  const modals = useModalStore();
  const { user } = useAuthStore();

  const queryKey = getProfileControllerPhotoQueryKey(username, id);

  const { mutateAsync: deletePhotoMutateAsync } = usePhotoControllerDelete();

  const { mutate: likeMutate } = usePhotoControllerLike({
    mutation: {
      onMutate: async (_, context) => {
        await context.client.cancelQueries({ queryKey });

        const previousPhoto = context.client.getQueryData<profileControllerPhotoResponse200>(queryKey);

        context.client.setQueryData<profileControllerPhotoResponse200>(queryKey, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              isLike: true,
              likes: prev.data.isLike ? prev.data.likes : prev.data.likes + 1,
            },
          };
        });

        return { previousPhoto };
      },
    },
  });

  const { mutate: unlikeMutate } = usePhotoControllerUnlike({
    mutation: {
      onMutate: async (_, context) => {
        await context.client.cancelQueries({ queryKey });

        const previousPhoto = context.client.getQueryData<profileControllerPhotoResponse200>(queryKey);

        context.client.setQueryData<profileControllerPhotoResponse200>(queryKey, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              isLike: false,
              likes: !prev.data.isLike ? prev.data.likes : prev.data.likes - 1,
            },
          };
        });

        return { previousPhoto };
      },
    },
  });

  const { mutate: followMutate } = useProfileControllerFollow({
    mutation: {
      onMutate: async (_, context) => {
        await context.client.cancelQueries({ queryKey });

        const previousPhoto = context.client.getQueryData<profileControllerPhotoResponse200>(queryKey);

        context.client.setQueryData<profileControllerPhotoResponse200>(queryKey, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              author: {
                ...prev.data.author,
                isFollowing: true,
                followers: prev.data.author.isFollowing ? prev.data.author.followers : prev.data.author.followers + 1,
              },
            },
          };
        });

        return { previousPhoto };
      },
    },
  });

  const { mutate: unfollowMutate } = useProfileControllerUnfollow({
    mutation: {
      onMutate: async (_, context) => {
        await context.client.cancelQueries({ queryKey });

        const previousPhoto = context.client.getQueryData<profileControllerPhotoResponse200>(queryKey);

        context.client.setQueryData<profileControllerPhotoResponse200>(queryKey, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              author: {
                ...prev.data.author,
                isFollowing: false,
                followers: !prev.data.author.isFollowing ? prev.data.author.followers : prev.data.author.followers - 1,
              },
            },
          };
        });

        return { previousPhoto };
      },
    },
  });

  const handleLikeButtonClick = async () => {
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    if (!photo.isLike) {
      likeMutate({ id });
    } else {
      unlikeMutate({ id });
    }
  };

  const handleFollowButtonClick = () => {
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    if (!photo.author.isFollowing) {
      followMutate({ username });
    } else {
      unfollowMutate({ username });
    }
  };

  const handleDeleteButtonClick = async () => {
    const confirmed = await modals.push({
      key: 'delete-photo-confirm-modal',
      component: ConfirmModal,
      props: {
        title: '사진을 삭제할까요?',
        description: '삭제된 사진은 복구할 수 없어요.',
        confirmText: '삭제',
      },
    });

    if (confirmed) {
      toast.promise(
        deletePhotoMutateAsync(
          { id },
          {
            onSuccess: () => {
              router.push(`/@${username}`);
            },
          },
        ),
        {
          loading: '사진을 삭제하고 있어요...',
          success: '사진이 삭제되었어요!',
          error: '사진 삭제에 실패했어요.',
        },
      );
    }
  };

  const handleShareButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('주소가 복사되었어요!');
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-24">
      <div className="relative sm:grid sm:grid-cols-4">
        <div className="absolute inset-0 opacity-50 blur-3xl sm:opacity-35">
          <Image className="object-cover" src={photo.image.path} alt="" sizes="50vw" fill priority />
        </div>
        <div
          className="relative col-span-2 col-start-2"
          style={{ aspectRatio: photo.image.width / photo.image.height }}
        >
          <Image className="rounded-lg object-contain" src={photo.image.path} alt="" sizes="50vw" fill priority />
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col">
          {photo.title && (
            <p className="mb-6 border-b-1 border-zinc-200 pb-2 text-xl font-semibold sm:text-2xl">{photo.title}</p>
          )}
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href={`/@${photo.author.username}`}
                className="h-10 w-10 cursor-pointer overflow-hidden rounded-full"
              >
                <Image className="object-cover" src={photo.author.thumbnail ?? ''} alt="" width={40} height={40} />
              </Link>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <Link href={`/@${photo.author.username}`} className="text-sm font-semibold sm:text-base">
                    {photo.author.nickname}
                  </Link>
                  {!photo.author.isOwner && (
                    <button
                      className="cursor-pointer rounded-lg border border-zinc-300 px-1.5 py-0.5 text-xs font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                      onClick={handleFollowButtonClick}
                    >
                      {photo.author.isFollowing ? '팔로우 중' : '팔로우'}
                    </button>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">{`@${photo.author.username}`}</span>
                  <span className="mx-1 text-sm text-zinc-500 dark:text-zinc-400">•</span>
                  <span className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">{`${formatNumber(photo.author.followers)} 팔로워`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="hidden cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-zinc-100 sm:flex hover:dark:bg-zinc-800"
                onClick={handleLikeButtonClick}
              >
                {!photo.isLike && <LucideHeart className="text-zinc-500 dark:text-zinc-400" />}
                {photo.isLike && <LucideHeart className="fill-red-500" strokeWidth={0} />}
                <p className="font-medium text-zinc-500 dark:text-zinc-400">{photo.likes}</p>
              </button>
              <button
                className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800"
                onClick={handleShareButtonClick}
              >
                <LucideShare2 className="text-zinc-500 dark:text-zinc-400" />
              </button>
              <Popover.Root>
                <Popover.Trigger
                  render={
                    <button className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                      <LucideEllipsisVertical className="text-zinc-500 dark:text-zinc-400" />
                    </button>
                  }
                />
                <Popover.Portal>
                  <Popover.Positioner align="end" sideOffset={8}>
                    <Popover.Popup>
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 shadow-2xl/20 outline-none dark:border-zinc-700 dark:bg-zinc-800">
                        <ul className="flex flex-col">
                          {photo.author.isOwner && (
                            <>
                              <li
                                className="flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
                                onClick={() => router.push(`${ROUTE_PHOTOS_WRITE_PAGE}/${id}`)}
                              >
                                <LucideSquarePen className="h-3.5 w-3.5" />
                                <span className="text-sm">수정하기</span>
                              </li>
                              <Popover.Close
                                nativeButton={false}
                                render={
                                  <li
                                    className="flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
                                    onClick={handleDeleteButtonClick}
                                  >
                                    <LucideTrash2 className="h-3.5 w-3.5" />
                                    <span className="text-sm">삭제하기</span>
                                  </li>
                                }
                              />
                            </>
                          )}
                          {!photo.author.isOwner && (
                            <li className="flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40">
                              <LucideFlag className="h-3.5 w-3.5" />
                              <span className="text-sm">신고하기</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
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
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{animal.name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-zinc-200/40 p-4 dark:bg-zinc-800">
              <div className="flex flex-col gap-1">
                <div className="flex items-center text-zinc-700 dark:text-zinc-200">
                  {/* <p className="text-sm font-medium">조회수 0회</p>
                  <p className="mx-1 text-sm font-medium">•</p> */}
                  <p className="text-sm font-medium">{formatDate(photo.createdAt)}</p>
                </div>
                {photo.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {photo.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="cursor-pointer text-sm text-emerald-700 dark:text-emerald-300"
                        onClick={() => router.push(`${ROUTE_TAGS_PAGE}/${tag.slug}`)}
                      >
                        {`#${tag.name}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ProfilePhotoViewerDescription description={photo.description} />
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:hidden">
          <button
            onClick={handleLikeButtonClick}
            className="flex w-36 cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-200 py-3 sm:hidden dark:border-zinc-700"
          >
            {!photo.isLike && <MdFavoriteBorder />}
            {photo.isLike && <MdFavorite className="text-red-500" />}
            <span className="text-sm font-medium">{`좋아요 ${formatNumber(photo.likes)}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoViewer;
