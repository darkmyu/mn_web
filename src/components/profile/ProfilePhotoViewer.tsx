'use client';

import { useProfileControllerPhotoSuspense } from '@/api/profile';
import { formatAge } from '@/utils/formatters';
import { LucideCat, LucideDog, LucideEllipsisVertical, LucideHeart, LucideShare2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  id: number;
  username: string;
}

function ProfilePhotoViewer({ id, username }: Props) {
  const {
    data: { data: photo },
  } = useProfileControllerPhotoSuspense(username, id);

  return (
    <div className="flex flex-col gap-24">
      <div className="relative grid grid-cols-10 gap-4">
        <div className="absolute inset-0 opacity-35 blur-3xl">
          <Image className="object-cover" src={photo.image.path} alt="" sizes="50vw" fill priority />
        </div>
        <div className="col-span-2 col-start-5">
          <div
            className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800"
            style={{ aspectRatio: photo.image.width / photo.image.height }}
          >
            <Image className="object-contain" src={photo.image.path} alt="" sizes="50vw" fill priority />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-4 col-start-4 flex flex-col">
          {photo.title && <p className="mb-6 border-b-1 border-zinc-200 pb-2 text-2xl font-semibold">{photo.title}</p>}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {photo.author.profileImage && (
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image className="object-cover" src={photo.author.profileImage} alt="" width={40} height={40} />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{photo.author.nickname}</span>
                  <span className="cursor-pointer text-sm font-medium text-emerald-600">팔로우</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{`@${photo.author.username}`}</span>
                  <span className="mx-1 text-sm text-zinc-500 dark:text-zinc-400">•</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">팔로워 4.7만명</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                  <LucideHeart className="text-zinc-500 dark:text-zinc-400" />
                </button>
                <p className="font-medium text-zinc-500 dark:text-zinc-400">24</p>
              </div>
              <button className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                <LucideShare2 className="text-zinc-500 dark:text-zinc-400" />
              </button>
              <button className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                <LucideEllipsisVertical className="text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="flex items-center rounded-lg rounded-b-none bg-zinc-200/40 pt-1.5 pr-4 pb-1 pl-2.5 dark:bg-zinc-800">
                <div className="flex items-center gap-1.5">
                  {photo.animal.thumbnail && (
                    <div className="h-5 w-5 overflow-hidden rounded-full">
                      <Image src={photo.animal.thumbnail} alt="" width={20} height={20} />
                    </div>
                  )}
                  {!photo.animal.thumbnail && (
                    <div className="h-4 w-4 overflow-hidden rounded-full">
                      {photo.animal.breed.species === 'DOG' && (
                        <LucideDog className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                      )}
                      {photo.animal.breed.species === 'CAT' && (
                        <LucideCat className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                      )}
                    </div>
                  )}
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                    {`${photo.animal.name} • ${formatAge(photo.animal.birthday)} • ${photo.animal.breed.name}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-lg rounded-tl-none bg-zinc-200/40 p-4 dark:bg-zinc-800">
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
