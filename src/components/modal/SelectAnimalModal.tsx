import { getAnimalControllerAllQueryKey, useAnimalControllerAllSuspense } from '@/api/animal';
import { AnimalResponse } from '@/api/index.schemas';
import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalControllerProps, useModalStore } from '@/stores/modal';
import { useQueryClient } from '@tanstack/react-query';
import { LucideCat, LucideCheck, LucideDog, LucidePlus, X } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, Suspense, useRef, useState } from 'react';
import { Modal } from '.';
import SelectAnimalSheet from '../sheet/SelectAnimalSheet';
import AnimalFormModal from './AnimalFormModal';

interface SelectAnimalModalProps extends ModalControllerProps<AnimalResponse[]> {
  initialAnimals: AnimalResponse[];
}

function SelectAnimalModal(props: SelectAnimalModalProps) {
  const { resolve, initialAnimals } = props;
  const isLaptop = useMediaQuery(LAPTOP_QUERY);
  const modals = useModalStore();
  const queryClient = useQueryClient();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [selectedAnimals, setSelectedAnimals] = useState(initialAnimals);

  const handleOpenChange = (open: boolean) => {
    if (!open) resolve(initialAnimals);
  };

  const handleConfirm = () => {
    resolve(selectedAnimals);
  };

  const handleCreateAnimalButtonClick = async () => {
    const animal = await modals.push({
      key: 'animal-form-modal',
      component: AnimalFormModal,
    });

    if (animal) {
      await queryClient.invalidateQueries({
        queryKey: getAnimalControllerAllQueryKey(),
      });

      setTimeout(() => {
        scrollerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  if (!isLaptop) {
    return <SelectAnimalSheet {...props} />;
  }

  return (
    <Modal.Root open={true} onOpenChange={handleOpenChange}>
      <Modal.Popup>
        <div className="flex w-[28rem] flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-medium">반려동물 선택</h1>
            <Modal.Close
              render={
                <button className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <X size={20} />
                </button>
              }
            />
          </div>
          <div className="scrollbar-hide flex max-h-80 flex-col gap-2 overflow-y-auto">
            <Suspense fallback={<AnimalListSkeleton />}>
              <AnimalList selectedAnimals={selectedAnimals} setSelectedAnimals={setSelectedAnimals} />
            </Suspense>
            <div ref={scrollerRef} />
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleCreateAnimalButtonClick}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-200 py-4 text-sm font-medium text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-300"
            >
              <LucidePlus className="h-4.5 w-4.5" />
              반려동물 프로필 등록
            </button>
            <Modal.Close
              render={
                <button
                  onClick={handleConfirm}
                  disabled={selectedAnimals.length === 0}
                  className="cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
                >
                  선택 완료
                </button>
              }
            />
          </div>
        </div>
      </Modal.Popup>
    </Modal.Root>
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

  if (animals.items.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2">
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
            className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
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
            {isSelected && <LucideCheck size={20} className="text-emerald-600" />}
          </li>
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

export default SelectAnimalModal;
