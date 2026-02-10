import { useBreedControllerAllSuspense } from '@/api/breed';
import { BreedResponse, BreedResponseSpecies } from '@/api/index.schemas';
import SelectBreedSheet from '@/components/sheet/SelectBreedSheet';
import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalControllerProps } from '@/stores/modal';
import { getChoseong } from 'es-hangul';
import { Check, Search, X } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Modal } from '.';

interface BreedListProps {
  searchQuery: string;
  initialBreed: BreedResponse | null;
  initialSpecies: BreedResponseSpecies;
  onBreedClick: (breed: BreedResponse) => void;
}

function BreedList({ searchQuery, initialBreed, initialSpecies, onBreedClick }: BreedListProps) {
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
    selectedItemRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <ul className="flex flex-col gap-2">
      {filteredBreeds.map((breed) => {
        const isSelected = breed.id === initialBreed?.id;

        return (
          <Modal.Close
            key={breed.id}
            nativeButton={false}
            render={
              <li
                ref={isSelected ? selectedItemRef : null}
                onClick={() => onBreedClick(breed)}
                className={`cursor-pointer rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700/40 ${
                  isSelected && 'flex items-center justify-between'
                }`}
              >
                <span>{breed.name}</span>
                {isSelected && <Check size={20} className="text-emerald-600" />}
              </li>
            }
          />
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

interface SelectBreedModalProps extends ModalControllerProps<BreedResponse | null> {
  initialBreed: BreedResponse | null;
  initialSpecies: BreedResponseSpecies;
}

function SelectBreedModal(props: SelectBreedModalProps) {
  const { resolve, initialBreed, initialSpecies } = props;
  const isLaptop = useMediaQuery(LAPTOP_QUERY);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenChange = (open: boolean) => {
    if (!open) resolve(null);
  };

  const handleBreedClick = (breed: BreedResponse) => {
    resolve(breed);
  };

  if (!isLaptop) {
    return <SelectBreedSheet {...props} />;
  }

  return (
    <Modal.Root open={true} onOpenChange={handleOpenChange}>
      <Modal.Popup>
        <div className="flex w-[28rem] flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-medium">품종 선택</h1>
            <Modal.Close
              render={
                <button className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <X size={20} />
                </button>
              }
            />
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
                searchQuery={searchQuery}
                initialBreed={initialBreed}
                initialSpecies={initialSpecies}
                onBreedClick={handleBreedClick}
              />
            </Suspense>
          </div>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export default SelectBreedModal;
