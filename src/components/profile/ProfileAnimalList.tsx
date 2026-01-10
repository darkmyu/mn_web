'use client';

import { useProfileControllerAnimalsSuspense } from '@/api/profile';
import { ROUTE_ANIMALS_WRITE_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import dayjs from '@/utils/dayjs';
import { formatAge } from '@/utils/formatters';
import { Popover } from '@base-ui/react/popover';
import { LucideCake, LucideCat, LucideDog, LucideMars, LucideVenus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  username: string;
}

function ProfileAnimalList({ username }: Props) {
  const { profile } = useAuthStore();
  const isOwner = profile?.username === username;

  const {
    data: { data: animals },
  } = useProfileControllerAnimalsSuspense(username);

  if (!isOwner && animals.items.length === 0) return null;

  return (
    <div className="flex items-stretch gap-4">
      {animals.items.map((animal) => (
        <Popover.Root key={animal.id}>
          <Popover.Trigger
            render={
              <div className="flex cursor-pointer items-center gap-3 rounded-full bg-zinc-100 p-1.5 pr-4 dark:bg-zinc-800">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                  {animal.thumbnail && (
                    <Image
                      className="aspect-square rounded-full object-cover"
                      src={animal.thumbnail}
                      sizes="2vw"
                      alt=""
                      fill
                    />
                  )}
                  {!animal.thumbnail && animal.breed.species === 'DOG' && (
                    <LucideDog className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  )}
                  {!animal.thumbnail && animal.breed.species === 'CAT' && (
                    <LucideCat className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{animal.name}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{animal.breed.name}</p>
                </div>
              </div>
            }
          />
          <Popover.Portal>
            <Popover.Positioner align="start" sideOffset={12}>
              <Popover.Popup className="w-2xs rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-2xl/50 outline-none dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-1">
                    <li className="flex items-center gap-2 text-zinc-500 dark:text-zinc-200">
                      {animal.gender === 'MALE' && <LucideMars className="h-3.5 w-3.5 text-blue-400" />}
                      {animal.gender === 'FEMALE' && <LucideVenus className="h-3.5 w-3.5 text-pink-400" />}
                      <span className="text-sm font-medium">{animal.gender === 'MALE' ? '남아' : '여아'}</span>
                    </li>
                    <li className="flex items-center gap-2 text-zinc-500 dark:text-zinc-200">
                      {animal.breed.species === 'DOG' && <LucideDog className="h-3.5 w-3.5" />}
                      {animal.breed.species === 'CAT' && <LucideCat className="h-3.5 w-3.5" />}
                      <span className="text-sm font-medium">{animal.breed.name}</span>
                    </li>
                    <li className="flex items-center gap-2 text-zinc-500 dark:text-zinc-200">
                      <LucideCake className="h-3.5 w-3.5" />
                      <span className="text-sm font-medium">{`${dayjs(animal.birthday).format('YYYY-MM-DD')} (${formatAge(animal.birthday)})`}</span>
                    </li>
                  </ul>
                  {isOwner && (
                    <Link
                      href={`${ROUTE_ANIMALS_WRITE_PAGE}/${animal.id}`}
                      className="cursor-pointer rounded-lg border-1 border-zinc-300 p-2.5 text-center text-sm font-semibold text-zinc-500 outline-none dark:border-zinc-200 dark:text-zinc-200"
                    >
                      반려동물 정보 수정
                    </Link>
                  )}
                </div>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ))}
      {isOwner && (
        <Link href={ROUTE_ANIMALS_WRITE_PAGE}>
          <div className="flex cursor-pointer items-center gap-3 rounded-full border-2 border-dashed border-zinc-300 p-1.5 pr-4 text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-600 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
              <Plus size={20} />
            </div>
            <p className="text-sm font-semibold">반려동물 등록</p>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ProfileAnimalList;
