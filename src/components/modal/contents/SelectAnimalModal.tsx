import { useAnimalControllerAllSuspense } from '@/api/animal';
import { AnimalResponse } from '@/api/index.schemas';
import { LucideCat, LucideCheck, LucideDog, X } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import { Modal } from '..';

interface Props {
  value: AnimalResponse | null;
  onChange: (animal: AnimalResponse) => void;
}

function AnimalList({ value, onChange }: Props) {
  const { data: animals } = useAnimalControllerAllSuspense();

  return (
    <ul className="flex flex-col gap-2">
      {animals.items.map((animal) => {
        const isSelected = animal.id === value?.id;

        return (
          <Modal.Close key={animal.id} asChild>
            <li
              onClick={() => onChange(animal)}
              className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  {animal.thumbnail && (
                    <Image
                      className="aspect-square rounded-full object-cover"
                      src={animal.thumbnail}
                      sizes="2vw"
                      alt=""
                      fill
                    />
                  )}
                  {!animal.thumbnail && (
                    <div className="flex h-full w-full items-center justify-center rounded-full border-1 border-dashed border-zinc-300 dark:border-zinc-600">
                      {animal.breed.species === 'DOG' && (
                        <LucideDog className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      )}
                      {animal.breed.species === 'CAT' && (
                        <LucideCat className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{animal.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{animal.breed.name}</p>
                </div>
              </div>
              {isSelected && <LucideCheck size={20} className="text-emerald-600" />}
            </li>
          </Modal.Close>
        );
      })}
    </ul>
  );
}

function AnimalListSkeleton() {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="flex items-center gap-3 rounded-md p-2">
          <div className="h-12 w-12 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2.5 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SelectAnimalModal({ value, onChange }: Props) {
  return (
    <Modal.Content className="w-[28rem] rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">반려동물 선택</h1>
          <Modal.Close asChild>
            <button className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <X size={20} />
            </button>
          </Modal.Close>
        </div>
        <div className="scrollbar-hide h-80 overflow-y-auto">
          <Suspense fallback={<AnimalListSkeleton />}>
            <AnimalList value={value} onChange={onChange} />
          </Suspense>
        </div>
      </div>
    </Modal.Content>
  );
}

export default SelectAnimalModal;
