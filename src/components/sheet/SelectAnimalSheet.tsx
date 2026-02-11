'use client';

import { useAnimalControllerAllSuspense } from '@/api/animal';
import { AnimalResponse } from '@/api/index.schemas';
import { Sheet } from '@/components/sheet';
import { ModalControllerProps } from '@/stores/modal';
import { Check, LucideCat, LucideDog } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';

interface SelectAnimalSheetProps extends ModalControllerProps<AnimalResponse[]> {
  initialAnimals: AnimalResponse[];
}

function SelectAnimalSheet({ resolve, initialAnimals }: SelectAnimalSheetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalResponse[]>(initialAnimals);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsOpen(false);
  };

  const handleCloseEnd = () => {
    resolve(isConfirmed ? selectedAnimals : initialAnimals);
  };

  return (
    <Sheet.Root isOpen={isOpen} detent="content" onClose={() => setIsOpen(false)} onCloseEnd={handleCloseEnd}>
      <Sheet.Backdrop onTap={() => setIsOpen(false)} />
      <Sheet.Container>
        <Sheet.Header>
          <Sheet.DragIndicator />
          <h1 className="p-4 font-medium">반려동물 선택</h1>
        </Sheet.Header>
        <Sheet.Content>
          <div className="relative h-[70dvh]">
            <Suspense fallback={<AnimalListSkeleton />}>
              <AnimalList selectedAnimals={selectedAnimals} setSelectedAnimals={setSelectedAnimals} />
            </Suspense>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent p-4 pt-10 dark:from-zinc-900 dark:via-zinc-900">
            <button
              onClick={handleConfirm}
              disabled={selectedAnimals.length === 0}
              className="w-full cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-all duration-300 hover:bg-emerald-600/90 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
            >
              선택 완료
            </button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet.Root>
  );
}

interface AnimalListProps {
  selectedAnimals: AnimalResponse[];
  setSelectedAnimals: Dispatch<SetStateAction<AnimalResponse[]>>;
}

function AnimalList({ selectedAnimals, setSelectedAnimals }: AnimalListProps) {
  const {
    data: { data: animals },
  } = useAnimalControllerAllSuspense();

  return (
    <ul className="flex flex-col pb-25">
      {animals.items.map((animal) => {
        const isSelected = selectedAnimals.some((v) => v.id === animal.id);

        const handleClick = () => {
          setSelectedAnimals(
            isSelected ? selectedAnimals.filter((v) => v.id !== animal.id) : [...selectedAnimals, animal],
          );
        };

        return (
          <li
            key={animal.id}
            onClick={handleClick}
            className="flex cursor-pointer items-center justify-between rounded-md p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
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
                <p className="text-sm font-semibold">{animal.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{animal.breed.name}</p>
              </div>
            </div>
            {isSelected && <Check size={20} className="text-emerald-600" />}
          </li>
        );
      })}
    </ul>
  );
}

function AnimalListSkeleton() {
  return (
    <ul className="flex flex-col pb-24">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="flex items-center gap-3 rounded-md p-4">
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

export default SelectAnimalSheet;
