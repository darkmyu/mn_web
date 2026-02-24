'use client';

import {
  useAnimalControllerCreate,
  useAnimalControllerDelete,
  useAnimalControllerUpdate,
  useAnimalControllerUpload,
} from '@/api/animal';
import {
  AnimalCreateRequest,
  AnimalResponse,
  AnimalResponseGender,
  AnimalUpdateRequest,
  BreedResponse,
  BreedResponseSpecies,
} from '@/api/index.schemas';
import { useAnimalForm } from '@/hooks/forms/animal';
import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalControllerProps, useModalStore } from '@/stores/modal';
import { convertOptimizeImage } from '@/utils/converters/convertOptimizeImage';
import dayjs from '@/utils/dayjs';
import { debounce } from 'es-toolkit';
import { Camera, LucideX, Search } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Modal } from '.';
import AnimalFormSheet from '../sheet/AnimalFormSheet';
import ConfirmModal from './ConfirmModal';
import SelectBreedModal from './SelectBreedModal';

interface Props extends ModalControllerProps<AnimalResponse | null> {
  animal?: AnimalResponse;
}

function AnimalFormModal({ resolve, animal }: Props) {
  const methods = useAnimalForm(
    animal && {
      breedId: animal.breed.id,
      name: animal.name,
      gender: animal.gender,
      birthday: dayjs(animal.birthday).format('YYYY-MM-DD'),
      thumbnail: animal.thumbnail,
    },
  );

  const {
    watch,
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const isEdit = !!animal;
  const name = watch('name');
  const gender = watch('gender');
  const birthday = watch('birthday');
  const thumbnail = watch('thumbnail');

  const modals = useModalStore();
  const isLaptop = useMediaQuery(LAPTOP_QUERY);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [response, setResponse] = useState<AnimalResponse | null>(null);
  const [isThumbnailConverting, setIsThumbnailConverting] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<BreedResponse | null>(animal?.breed ?? null);
  const [selectedSpecies, setSelectedSpecie] = useState<BreedResponseSpecies>(animal?.breed.species ?? 'DOG');

  const { mutateAsync: createAnimalMutateAsync } = useAnimalControllerCreate();
  const { mutateAsync: updateAnimalMutateAsync } = useAnimalControllerUpdate();
  const { mutateAsync: deleteAnimalMutateAsync } = useAnimalControllerDelete();

  const { mutate: uploadAnimalThumbnail, isPending: isUploadAnimalThumbnailPending } = useAnimalControllerUpload({
    mutation: {
      onSuccess: (response) => {
        setValue('thumbnail', response.data.path);
      },
      onError: () => {
        toast.error('이미지 업로드에 실패했어요.');
      },
    },
  });

  const debouncedCreateAnimalMutateAsync = useMemo(
    () =>
      debounce((data: AnimalCreateRequest) => {
        toast.promise(
          createAnimalMutateAsync(
            { data },
            {
              onSuccess: (response) => {
                setResponse(response.data);
                setIsOpen(false);
              },
            },
          ),
          {
            loading: '반려동물 정보를 등록하고 있어요...',
            success: '반려동물 정보가 등록되었어요!',
            error: '반려동물 정보 등록에 실패했어요.',
          },
        );
      }, 300),
    [createAnimalMutateAsync],
  );

  const debouncedUpdateAnimalMutateAsync = useMemo(
    () =>
      debounce((id: number, data: AnimalUpdateRequest) => {
        toast.promise(
          updateAnimalMutateAsync(
            {
              id,
              data,
            },
            {
              onSuccess: (response) => {
                setResponse(response.data);
                setIsOpen(false);
              },
            },
          ),
          {
            loading: '반려동물 정보를 수정하고 있어요...',
            success: '반려동물 정보가 수정되었어요!',
            error: '반려동물 정보 수정에 실패했어요.',
          },
        );
      }, 300),
    [updateAnimalMutateAsync],
  );

  const onSubmit: SubmitHandler<AnimalCreateRequest> = (body) => {
    const payload = {
      ...body,
      birthday: dayjs(body.birthday).toISOString(),
    };

    if (!isEdit) {
      debouncedCreateAnimalMutateAsync(payload);
    } else {
      debouncedUpdateAnimalMutateAsync(animal.id, payload);
    }
  };

  const handleGenderClick = (gender: AnimalResponseGender) => {
    setValue('gender', gender);
  };

  const handleSpeciesClick = (species: BreedResponseSpecies) => {
    setSelectedSpecie(species);
    setSelectedBreed(null);

    const values = getValues();
    reset({ ...values, breedId: undefined });
  };

  const handleBreedClick = async () => {
    const breed = await modals.push({
      key: 'select-breed-modal',
      component: SelectBreedModal,
      props: {
        initialBreed: selectedBreed,
        initialSpecies: selectedSpecies,
      },
    });

    if (breed) {
      setSelectedBreed(breed);
      setValue('breedId', breed.id, { shouldValidate: true });
    }
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = value.replace(/(\d{4})(\d)/, '$1-$2').replace(/(\d{4}-\d{2})(\d)/, '$1-$2');

    setValue('birthday', formatted, { shouldValidate: true });
  };

  const handleThumbnailClick = () => {
    thumbnailRef.current?.click();
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsThumbnailConverting(true);

    try {
      const thumbnail = await convertOptimizeImage(file);

      uploadAnimalThumbnail({
        data: { thumbnail },
      });
    } catch {
      toast.error('이미지 업로드에 실패했어요.');
    } finally {
      setIsThumbnailConverting(false);
    }
  };

  const handleThumbnailCancel = () => {
    setValue('thumbnail', null, { shouldValidate: true });
  };

  const handleDeleteAnimalButtonClick = async (id: number) => {
    const confirmed = await modals.push({
      key: 'confirm-modal',
      component: ConfirmModal,
      props: {
        title: '반려동물 등록 정보를 삭제할까요?',
        description: '삭제된 반려동물 등록 정보는 복구할 수 없어요.',
        confirmText: '삭제',
      },
    });

    if (confirmed) {
      toast.promise(
        deleteAnimalMutateAsync(
          { id },
          {
            onSuccess: (response) => {
              setResponse(response.data);
              setIsOpen(false);
            },
          },
        ),
        {
          loading: '반려동물 등록 정보를 삭제하고 있어요...',
          success: '반려동물 등록 정보가 삭제되었어요!',
          error: '반려동물 등록 정보 삭제에 실패했어요.',
        },
      );
    }
  };

  const handleOpenChange = () => {
    setIsOpen(false);
  };

  const handleOpenChangeComplete = () => {
    if (!isOpen) {
      resolve(response);
    }
  };

  if (!isLaptop) {
    return (
      <FormProvider {...methods}>
        <AnimalFormSheet
          isOpen={isOpen}
          animal={animal}
          thumbnailRef={thumbnailRef}
          isThumbnailConverting={isThumbnailConverting}
          isUploadAnimalThumbnailPending={isUploadAnimalThumbnailPending}
          selectedSpecies={selectedSpecies}
          selectedBreed={selectedBreed}
          onClose={handleOpenChange}
          onCloseEnd={handleOpenChangeComplete}
          onThumbnailClick={handleThumbnailClick}
          onThumbnailCancel={handleThumbnailCancel}
          onThumbnailChange={handleThumbnailChange}
          onSpeciesClick={handleSpeciesClick}
          onBreedClick={handleBreedClick}
          onGenderClick={handleGenderClick}
          onBirthdayChange={handleBirthdayChange}
          onDeleteAnimalButtonClick={handleDeleteAnimalButtonClick}
          onSubmit={onSubmit}
        />
      </FormProvider>
    );
  }

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange} onOpenChangeComplete={handleOpenChangeComplete}>
      <Modal.Popup>
        <div className="relative flex max-h-[90dvh] w-4xl flex-col overflow-hidden rounded-lg">
          <header className="sticky top-0 z-10 flex items-center justify-between bg-zinc-50 px-6 py-4 dark:bg-zinc-900">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {!isEdit ? '# 반려동물 프로필 등록' : '# 반려동물 프로필 수정'}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                반려동물의 정보를 입력하고 소중한 기록을 남겨보세요.
              </p>
            </div>
            <Modal.Close
              render={
                <button className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <LucideX className="h-5 w-5" />
                </button>
              }
            />
          </header>
          <form className="flex flex-1 items-center gap-24 overflow-y-auto p-20 pr-12 pl-24">
            <div className="flex flex-1 flex-col items-center gap-6">
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
                {(isUploadAnimalThumbnailPending || isThumbnailConverting) && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-zinc-950/40 backdrop-blur-[1px]">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-1 rounded-full border border-white/20" />
                      <div className="absolute inset-1 animate-[spin_1.2s_linear_infinite] rounded-full border-2 border-transparent border-t-emerald-400 border-l-emerald-500" />
                    </div>
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
            <div className="flex flex-2 flex-col gap-10">
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
                <div className="relative w-full" onClick={handleBreedClick}>
                  <div className="absolute right-4 flex h-full cursor-pointer items-center justify-center">
                    <Search className="h-4 w-4 text-zinc-700" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={selectedBreed?.name ?? ''}
                    placeholder="반려동물의 품종을 선택해주세요"
                    className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  이름 <span className="text-sm text-red-700">*</span>
                </label>
                <div
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:ring-0 ${
                    errors.name
                      ? 'border-red-400 focus-within:border-red-400 dark:border-red-400 dark:focus-within:border-red-400'
                      : 'border-zinc-200 focus-within:border-zinc-400 dark:border-zinc-700 dark:focus-within:border-zinc-500'
                  }`}
                >
                  <input
                    {...register('name', {
                      onChange: (e) => {
                        if (e.target.value.length > 30) {
                          e.target.value = e.target.value.slice(0, 30);
                          setValue('name', e.target.value);
                        }
                      },
                    })}
                    type="text"
                    autoComplete="off"
                    defaultValue={name}
                    placeholder="반려동물의 이름을 입력해주세요"
                    className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">{`${name.length}/30`}</span>
                </div>
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
                      ? 'border-red-400 focus:border-red-400 dark:border-red-400 dark:focus:border-red-400'
                      : 'border-zinc-200 placeholder-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:placeholder-zinc-500 dark:focus:border-zinc-500'
                  }`}
                />
              </div>
              {isEdit && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteAnimalButtonClick(animal.id)}
                    className="cursor-pointer text-sm text-red-500 underline underline-offset-4 transition-colors hover:text-red-400 dark:text-red-400 dark:hover:text-red-400/90"
                  >
                    반려동물 등록 정보 삭제
                  </button>
                </div>
              )}
            </div>
          </form>
          <footer className="flex justify-end bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent px-12 py-8 dark:from-zinc-900 dark:via-zinc-900">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isUploadAnimalThumbnailPending || isThumbnailConverting}
              className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-emerald-50 transition-all duration-300 hover:bg-emerald-600/90 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
            >
              {!isEdit ? '등록하기' : '수정하기'}
            </button>
          </footer>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export default AnimalFormModal;
