'use client';

import { $api } from '@/api';
import { AnimalGender, AnimalResponse, AnimalSpecies, BreedResponse } from '@/api/types';
import { AnimalBody, useAnimalForm } from '@/hooks/forms/animal';
import dayjs from '@/utils/dayjs';
import { debounce } from 'es-toolkit';
import { Camera, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Modal } from '../modal';
import SelectBreedModal from '../modal/contents/SelectBreedModal';

interface Props {
  animal?: AnimalResponse;
}

function AnimalForm({ animal }: Props) {
  const {
    watch,
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useAnimalForm(
    animal && {
      breedId: animal.breed.id,
      name: animal.name,
      gender: animal.gender,
      birthday: dayjs(animal.birthday).format('YYYY-MM-DD'),
      ...(animal.thumbnail && { thumbnail: animal.thumbnail }),
    },
  );

  const isEdit = !!animal;
  const name = watch('name');
  const gender = watch('gender');
  const birthday = watch('birthday');
  const thumbnail = watch('thumbnail');

  const router = useRouter();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [selectedSpecies, setSelectedSpecie] = useState<AnimalSpecies>(animal?.breed.species ?? 'DOG');
  const [selectedBreed, setSelectedBreed] = useState<BreedResponse | null>(animal?.breed ?? null);

  const { mutate: createAnimalMutate } = $api.useMutation('post', '/api/v1/animals');
  const { mutate: updateAnimalMutate } = $api.useMutation('put', '/api/v1/animals/{id}');

  const { mutate: uploadAnimalThumbnail, isPending: isUploadAnimalThumbnailPending } = $api.useMutation(
    'post',
    '/api/v1/animals/thumbnail',
    {
      onSuccess: ({ path }) => {
        setValue('thumbnail', path);
      },
      onError: () => {
        /** @TODO alert error */
      },
    },
  );

  const debouncedCreateAnimalMutate = useMemo(
    () =>
      debounce((body: AnimalBody) => {
        createAnimalMutate(
          { body },
          {
            onSuccess: (data) => {
              router.push(`/@${data.owner.username}`);
            },
          },
        );
      }, 500),
    [createAnimalMutate, router],
  );

  const debouncedUpdateAnimalMutate = useMemo(
    () =>
      debounce((id: number, body: AnimalBody) => {
        updateAnimalMutate(
          {
            params: {
              path: { id },
            },
            body,
          },
          {
            onSuccess: (data) => {
              router.push(`/@${data.owner.username}`);
            },
          },
        );
      }, 500),
    [updateAnimalMutate, router],
  );

  const onSubmit: SubmitHandler<AnimalBody> = (body) => {
    const payload = {
      ...body,
      birthday: dayjs(body.birthday).toISOString(),
    };

    if (!isEdit) {
      debouncedCreateAnimalMutate(payload);
    } else {
      debouncedUpdateAnimalMutate(animal.id, payload);
    }
  };

  const handleGenderClick = (gender: AnimalGender) => {
    setValue('gender', gender);
  };

  const handleSpeciesClick = (species: AnimalSpecies) => {
    setSelectedSpecie(species);
    setSelectedBreed(null);

    const values = getValues();
    reset({ ...values, breedId: undefined });
  };

  const handleBreedChange = (breed: BreedResponse) => {
    setValue('breedId', breed.id, { shouldValidate: true });
    setSelectedBreed(breed);
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = value.replace(/(\d{4})(\d)/, '$1-$2').replace(/(\d{4}-\d{2})(\d)/, '$1-$2');

    setValue('birthday', formatted, { shouldValidate: true });
  };

  const handleThumbnailClick = () => {
    thumbnailRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = e.target.files?.[0];
    if (!thumbnail) return;

    uploadAnimalThumbnail({
      body: { thumbnail },
      bodySerializer: (body) => {
        const formData = new FormData();
        formData.append('thumbnail', body.thumbnail);
        return formData;
      },
    });
  };

  const handleThumbnailCancel = () => {
    setValue('thumbnail', undefined);
  };

  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="sticky top-0 flex items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {!isEdit ? '# 반려동물 프로필 등록' : '# 반려동물 프로필 수정'}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            반려동물의 프로필을 완성하고 소중한 기록을 남겨보세요.
          </p>
        </div>
        <button
          disabled={!isValid || isUploadAnimalThumbnailPending}
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:focus:ring-emerald-800 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
        >
          {!isEdit ? '등록하기' : '수정하기'}
        </button>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
        <form className="grid grid-cols-4 items-center gap-8 p-6">
          <div className="col-span-2 flex flex-col items-center gap-6">
            <div
              onClick={handleThumbnailClick}
              className="relative h-64 w-64 cursor-pointer rounded-full border-2 border-dashed border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800"
            >
              {thumbnail && <Image src={thumbnail} alt="" fill sizes="192px" className="rounded-full object-cover" />}
              {!thumbnail && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-400">
                  <Camera size={32} />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">프로필 사진을 선택해주세요.</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleThumbnailClick}
                className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                이미지 업로드
              </button>
              <button
                type="button"
                disabled={!thumbnail}
                onClick={handleThumbnailCancel}
                className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                이미지 삭제
              </button>
            </div>
            <input
              ref={thumbnailRef}
              type="file"
              accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
              onChange={handleThumbnailChange}
              hidden
            />
          </div>
          <div className="col-span-2 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                동물 <span className="text-sm text-red-700">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSpeciesClick('DOG')}
                  className={`cursor-pointer rounded-lg border py-3 text-sm font-medium ${
                    selectedSpecies === 'DOG'
                      ? 'border-emerald-500 text-emerald-700 dark:border-emerald-600 dark:text-emerald-50'
                      : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
                  }`}
                >
                  강아지
                </button>
                <button
                  type="button"
                  onClick={() => handleSpeciesClick('CAT')}
                  className={`cursor-pointer rounded-lg border py-3 text-sm font-medium ${
                    selectedSpecies === 'CAT'
                      ? 'border-emerald-500 text-emerald-700 dark:border-emerald-600 dark:text-emerald-50'
                      : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
                  }`}
                >
                  고양이
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                품종 <span className="text-sm text-red-700">*</span>
              </label>
              <Modal.Root>
                <Modal.Trigger asChild>
                  <div className="relative w-full">
                    <div className="absolute right-4 flex h-full cursor-pointer items-center justify-center">
                      <Search className="h-4 w-4 text-zinc-700" />
                    </div>
                    <input
                      type="text"
                      readOnly
                      defaultValue={selectedBreed?.name}
                      placeholder="반려동물의 품종을 선택해주세요"
                      className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                    />
                  </div>
                </Modal.Trigger>
                <SelectBreedModal value={selectedBreed} species={selectedSpecies} onChange={handleBreedChange} />
              </Modal.Root>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                이름 <span className="text-sm text-red-700">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                autoComplete="off"
                defaultValue={name}
                placeholder="반려동물의 이름을 입력해주세요"
                className={`rounded-lg border px-4 py-3 text-sm focus:ring-0 focus:outline-none dark:text-zinc-100 ${
                  errors.name
                    ? 'border-red-400 placeholder-red-400 focus:border-red-400 dark:border-red-400 dark:focus:border-red-400'
                    : 'border-zinc-200 placeholder-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:placeholder-zinc-500 dark:focus:border-zinc-500'
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                성별 <span className="text-sm text-red-700">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleGenderClick('MALE')}
                  className={`cursor-pointer rounded-lg border py-3 text-sm font-medium ${
                    gender === 'MALE'
                      ? 'border-emerald-500 text-emerald-700 dark:border-emerald-600 dark:text-emerald-50'
                      : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
                  }`}
                >
                  남아
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderClick('FEMALE')}
                  className={`cursor-pointer rounded-lg border py-3 text-sm font-medium ${
                    gender === 'FEMALE'
                      ? 'border-emerald-500 text-emerald-700 dark:border-emerald-600 dark:text-emerald-50'
                      : 'border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
                  }`}
                >
                  여아
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                생년월일 <span className="text-sm text-red-700">*</span>
              </label>
              <input
                value={birthday}
                onChange={handleBirthdayChange}
                placeholder="2024-11-08 형식으로 입력해주세요"
                autoComplete="off"
                className={`rounded-lg border px-4 py-3 text-sm focus:ring-0 focus:outline-none dark:text-zinc-100 ${
                  errors.birthday
                    ? 'border-red-400 placeholder-red-400 focus:border-red-400 dark:border-red-400 dark:focus:border-red-400'
                    : 'border-zinc-200 placeholder-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:placeholder-zinc-500 dark:focus:border-zinc-500'
                }`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AnimalForm;
