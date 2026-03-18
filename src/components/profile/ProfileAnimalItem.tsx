import { AnimalResponse } from '@/api/index.schemas';
import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import dayjs from '@/utils/dayjs';
import { formatAge } from '@/utils/formatters';
import { optimizeImage } from '@/utils/optimizeImage';
import { Popover } from '@base-ui/react/popover';
import { LucideCake, LucideCat, LucideDog, LucideMars, LucideVenus } from 'lucide-react';
import Image from 'next/image';

interface Props {
  animal: AnimalResponse;
  isOwner: boolean;
  onAnimalFormOpen: (animal: AnimalResponse) => void;
}

function ProfileAnimalItem({ animal, isOwner, onAnimalFormOpen: handleAnimalFormOpen }: Props) {
  const isLaptop = useMediaQuery(LAPTOP_QUERY);

  return (
    <Popover.Root>
      <Popover.Trigger
        nativeButton={false}
        render={
          <div className="flex shrink-0 cursor-pointer items-center gap-3 rounded-lg bg-zinc-100 p-1.5 pr-4 dark:bg-zinc-800">
            <div className="relative flex size-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
              {animal.thumbnail && (
                <Image
                  className="aspect-square rounded-full object-cover"
                  src={optimizeImage({ src: animal.thumbnail, width: 128 })}
                  alt=""
                  width={36}
                  height={36}
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
        <Popover.Positioner align="start" side={isLaptop ? 'bottom' : 'right'} sideOffset={12}>
          <Popover.Popup className="w-70 rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-2xl/50 outline-none dark:border-zinc-700 dark:bg-zinc-800">
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
                <Popover.Close
                  render={
                    <button
                      onClick={() => handleAnimalFormOpen(animal)}
                      className="cursor-pointer rounded-lg border-1 border-zinc-300 p-2.5 text-center text-sm font-semibold text-zinc-500 outline-none dark:border-zinc-200 dark:text-zinc-200"
                    >
                      반려동물 정보 수정
                    </button>
                  }
                />
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ProfileAnimalItem;
