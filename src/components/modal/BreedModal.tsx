import { $api } from '@/api';
import { AnimalSpecies, BreedResponse } from '@/api/types';
import { useModalStore } from '@/stores/modal';
import { getChoseong } from 'es-hangul';
import { Check, Search, X } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';

interface Props {
  selectedSpecies: AnimalSpecies;
  selectedBreed: BreedResponse | null;
  onBreedClick: (breed: BreedResponse) => void;
}

interface BreedListProps extends Props {
  searchQuery: string;
}

function BreedList({ selectedSpecies, selectedBreed, onBreedClick: handleBreedClick, searchQuery }: BreedListProps) {
  const selectedItemRef = useRef<HTMLLIElement>(null);

  const { data: breeds } = $api.useSuspenseQuery(
    'get',
    '/api/v1/breeds',
    {
      params: {
        query: {
          species: selectedSpecies,
        },
      },
    },
    {
      gcTime: Infinity,
      staleTime: Infinity,
    },
  );

  const filteredBreeds = breeds.items.filter(
    (breed) => breed.name.includes(searchQuery) || getChoseong(breed.name).includes(searchQuery),
  );

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <ul className="flex flex-col gap-2">
      {filteredBreeds.map((breed) => {
        const isSelected = breed.id === selectedBreed?.id;

        return (
          <li
            key={breed.id}
            ref={isSelected ? selectedItemRef : null}
            onClick={() => handleBreedClick(breed)}
            className={`cursor-pointer rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
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
    <ul className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="h-9 w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
      ))}
    </ul>
  );
}

function BreedModal({ selectedSpecies, selectedBreed, onBreedClick: handleBreedClick }: Props) {
  const { close } = useModalStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-[28rem] rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">품종 선택</h1>
          <button
            className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            onClick={() => close()}
          >
            <X size={20} />
          </button>
        </div>
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
        <div className="scrollbar-hide h-80 overflow-y-auto">
          <Suspense fallback={<BreedListSkeleton />}>
            <BreedList
              selectedSpecies={selectedSpecies}
              selectedBreed={selectedBreed}
              onBreedClick={handleBreedClick}
              searchQuery={searchQuery}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default BreedModal;
