'use client';

import { useAnimalControllerAllSuspense } from '@/api/animal';
import { AnimalResponse } from '@/api/index.schemas';
import { Sheet } from '@/components/sheet';
import { Check, LucideCat, LucideDog, LucidePlus } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, Suspense } from 'react';

interface SelectAnimalSheetProps {
  isOpen: boolean;
  selectedAnimals: AnimalResponse[];
  setSelectedAnimals: Dispatch<SetStateAction<AnimalResponse[]>>;
  onConfirm: () => void;
  onClose: () => void;
  onCloseEnd: () => void;
  onCreateAnimalButtonClick: () => void;
}

function SelectAnimalSheet({
  isOpen,
  selectedAnimals,
  setSelectedAnimals,
  onConfirm: handleConfirm,
  onClose: handleClose,
  onCloseEnd: handleCloseEnd,
  onCreateAnimalButtonClick: handleCreateAnimalButtonClick,
}: SelectAnimalSheetProps) {
  return (
    <Sheet.Root isOpen={isOpen} detent="content" onClose={handleClose} onCloseEnd={handleCloseEnd}>
      <Sheet.Backdrop onTap={handleClose} />
      <Sheet.Container>
        <Sheet.Header>
          <Sheet.DragIndicator />
          <h1 className="p-4 font-medium">반려동물 선택</h1>
        </Sheet.Header>
        <Sheet.Content>
          <section className="relative h-[70dvh]">
            <Suspense fallback={<AnimalListSkeleton />}>
              <AnimalList selectedAnimals={selectedAnimals} setSelectedAnimals={setSelectedAnimals} />
            </Suspense>
          </section>
          <footer className="absolute bottom-0 left-0 flex w-full flex-col gap-4 bg-zinc-50 p-4 dark:bg-zinc-900">
            <button
              onClick={handleCreateAnimalButtonClick}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 py-4 text-sm font-medium text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-300"
            >
              <LucidePlus className="h-4.5 w-4.5" />
              반려동물 프로필 등록
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedAnimals.length === 0}
              className="w-full cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-all duration-300 hover:bg-emerald-600/90 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
            >
              선택 완료
            </button>
          </footer>
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
    <ul className="flex flex-col pb-38">
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
