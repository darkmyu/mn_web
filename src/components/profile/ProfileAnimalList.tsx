'use client';

import { $api } from '@/api';
import { ROUTE_ANIMALS_WRITE_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import AnimalChip from '../animal/AnimalChip';

interface Props {
  username: string;
}

function ProfileAnimalList({ username }: Props) {
  const { user } = useAuthStore();
  const isOwner = user?.username === username;

  const { data: animals } = $api.useSuspenseQuery('get', '/api/v1/users/{username}/animals', {
    params: {
      path: { username },
    },
  });

  if (!isOwner && animals.items.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      {animals.items.map((animal) => (
        <AnimalChip key={animal.id} animal={animal} />
      ))}
      {isOwner && (
        <Link
          href={ROUTE_ANIMALS_WRITE_PAGE}
          className="flex cursor-pointer items-center gap-3 rounded-full border-2 border-dashed border-zinc-300 p-1.5 pr-4 text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-600 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-400"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
            <Plus size={20} />
          </div>
          <p className="text-sm font-semibold">반려동물 등록</p>
        </Link>
      )}
    </div>
  );
}

export default ProfileAnimalList;
