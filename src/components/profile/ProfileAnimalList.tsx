'use client';

import { AnimalResponse } from '@/api/index.schemas';
import { getProfileControllerAnimalsQueryKey, useProfileControllerAnimalsSuspense } from '@/api/profile';
import { useIsClient } from '@/hooks/useIsClient';
import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useQueryClient } from '@tanstack/react-query';
import { LucidePlus } from 'lucide-react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import AnimalFormModal from '../modal/AnimalFormModal';
import ProfileAnimalItem from './ProfileAnimalItem';

interface Props {
  username: string;
}

function ProfileAnimalList({ username }: Props) {
  const modals = useModalStore();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { isClient } = useIsClient();
  const isLaptop = useMediaQuery(LAPTOP_QUERY);
  const isOwner = user?.username === username;

  const {
    data: { data: animals },
  } = useProfileControllerAnimalsSuspense(username, {
    limit: 9999,
  });

  const handleAnimalFormOpen = async (animal?: AnimalResponse) => {
    const response = await modals.push({
      key: 'animal-form-modal',
      component: AnimalFormModal,
      props: {
        animal,
      },
    });

    if (response) {
      queryClient.invalidateQueries({
        queryKey: getProfileControllerAnimalsQueryKey(username),
      });
    }
  };

  if (!isClient) return null;
  if (!isOwner && animals.items.length === 0) return null;

  if (isLaptop) {
    return (
      <Swiper className="z-auto! w-full" wrapperClass="z-auto!" slidesPerView={1}>
        {animals.items.map((animal) => (
          <SwiperSlide key={animal.id}>
            <ProfileAnimalItem animal={animal} isOwner={isOwner} onAnimalFormOpen={handleAnimalFormOpen} />
          </SwiperSlide>
        ))}
        {isOwner && (
          <SwiperSlide>
            <button
              onClick={() => handleAnimalFormOpen()}
              className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-dashed border-zinc-300 px-4 text-sm font-semibold text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-600 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-400"
            >
              <LucidePlus className="size-4" /> 반려동물 등록
            </button>
          </SwiperSlide>
        )}
      </Swiper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {animals.items.map((animal) => (
        <ProfileAnimalItem key={animal.id} animal={animal} isOwner={isOwner} onAnimalFormOpen={handleAnimalFormOpen} />
      ))}
      {isOwner && (
        <button
          onClick={() => handleAnimalFormOpen()}
          className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-dashed border-zinc-300 px-4 text-sm font-semibold text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-600 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-400"
        >
          <LucidePlus className="size-4" /> 반려동물 등록
        </button>
      )}
    </div>
  );
}

export default ProfileAnimalList;
