import { AnimalResponse } from '@/api/types';
import { Cat, Dog } from 'lucide-react';
import Image from 'next/image';

interface Props {
  animal: AnimalResponse;
}

function AnimalChip({ animal }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-full bg-zinc-100 p-1.5 pr-4 dark:bg-zinc-800">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
        {animal.thumbnail && (
          <Image className="aspect-square rounded-full object-cover" src={animal.thumbnail} sizes="2vw" alt="" fill />
        )}
        {!animal.thumbnail && animal.breed.species === 'DOG' && (
          <Dog className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        )}
        {!animal.thumbnail && animal.breed.species === 'CAT' && (
          <Cat className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold">{animal.name}</p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{animal.breed.name}</p>
      </div>
    </div>
  );
}

export default AnimalChip;
