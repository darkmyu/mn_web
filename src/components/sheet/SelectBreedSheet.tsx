'use client';

import { useBreedControllerAllSuspense } from '@/api/breed';
import { BreedResponse, BreedResponseSpecies } from '@/api/index.schemas';
import { Sheet } from '@/components/sheet';
import { getChoseong } from 'es-hangul';
import { Check, Search } from 'lucide-react';
import { Dispatch, SetStateAction, Suspense, useEffect, useRef } from 'react';

interface SelectBreedSheetProps {
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  initialSpecies: BreedResponseSpecies;
  selectedBreed: BreedResponse | null;
  onClose: () => void;
  onCloseEnd: () => void;
  onBreedClick: (breed: BreedResponse) => void;
}

function SelectBreedSheet({
  isOpen,
  searchQuery,
  setSearchQuery,
  initialSpecies,
  selectedBreed,
  onClose: handleClose,
  onCloseEnd: handleCloseEnd,
  onBreedClick: handleBreedClick,
}: SelectBreedSheetProps) {
  return (
    <Sheet.Root isOpen={isOpen} detent="content" onClose={handleClose} onCloseEnd={handleCloseEnd}>
      <Sheet.Backdrop onTap={handleClose} />
      <Sheet.Container>
        <Sheet.Header>
          <Sheet.DragIndicator />
          <div className="flex flex-col gap-4 p-4">
            <h1 className="font-medium">품종 선택</h1>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="품종 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-4 py-3 pl-10 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
              />
            </div>
          </div>
        </Sheet.Header>
        <Sheet.Content>
          <Suspense fallback={<BreedListSkeleton />}>
            <BreedList
              searchQuery={searchQuery}
              selectedBreed={selectedBreed}
              initialSpecies={initialSpecies}
              onBreedClick={handleBreedClick}
            />
          </Suspense>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet.Root>
  );
}

interface BreedListProps {
  searchQuery: string;
  selectedBreed: BreedResponse | null;
  initialSpecies: BreedResponseSpecies;
  onBreedClick: (breed: BreedResponse) => void;
}

function BreedList({ searchQuery, selectedBreed, initialSpecies, onBreedClick }: BreedListProps) {
  const selectedItemRef = useRef<HTMLLIElement>(null);

  const {
    data: { data: breeds },
  } = useBreedControllerAllSuspense(
    {
      species: initialSpecies,
      limit: 9999,
    },
    {
      query: {
        gcTime: Infinity,
        staleTime: Infinity,
      },
    },
  );

  const filteredBreeds = breeds.items.filter(
    (breed) => breed.name.includes(searchQuery) || getChoseong(breed.name).includes(searchQuery),
  );

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <ul className="flex h-[70dvh] flex-col">
      {filteredBreeds.map((breed) => {
        const isSelected = breed.id === selectedBreed?.id;

        return (
          <li
            key={breed.id}
            ref={isSelected ? selectedItemRef : null}
            onClick={() => onBreedClick(breed)}
            className={`cursor-pointer rounded-md px-6 py-4 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700/40 ${
              isSelected && 'flex items-center justify-between'
            }`}
          >
            <span>{breed.name}</span>
            {isSelected && <Check size={20} className="text-emerald-600" />}
          </li>
        );
      })}
    </ul>
  );
}

function BreedListSkeleton() {
  return (
    <ul className="flex h-[70dvh] flex-col">
      {Array.from({ length: 20 }).map((_, index) => (
        <li key={index} className="mx-6 my-4 min-h-8 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
      ))}
    </ul>
  );
}

export default SelectBreedSheet;
