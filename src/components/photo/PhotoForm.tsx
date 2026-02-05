'use client';

import { AnimalResponse, PhotoCreateRequest, PhotoResponse, PhotoUpdateRequest } from '@/api/index.schemas';
import { usePhotoControllerCreate, usePhotoControllerUpdate, usePhotoControllerUpload } from '@/api/photo';
import { usePhotoForm } from '@/hooks/forms/photo';
import { useModalStore } from '@/stores/modal';
import { debounce } from 'es-toolkit';
import { LucideCamera, LucideCat, LucideDog, LucideSearch, LucideX } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import SelectAnimalModal from '../modal/SelectAnimalModal';

interface Props {
  photo?: PhotoResponse;
}

function PhotoForm({ photo }: Props) {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = usePhotoForm(
    photo && {
      animalIds: photo.animals.map((animal) => animal.id),
      image: photo.image,
      tags: photo.tags.map((tag) => tag.name),
      title: photo.title,
      description: photo.description,
    },
  );

  const isEdit = !!photo;
  const tags = watch('tags');
  const image = watch('image');
  const title = watch('title');
  const description = watch('description');

  const router = useRouter();
  const modals = useModalStore();
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalResponse[]>(photo?.animals ?? []);

  const { mutate: createPhotoMutate } = usePhotoControllerCreate();
  const { mutate: updatePhotoMutate } = usePhotoControllerUpdate();

  const { mutate: uploadPhotoImage, isPending: isUploadPhotoImagePending } = usePhotoControllerUpload({
    mutation: {
      onSuccess: (response) => {
        setValue('image', response.data, { shouldValidate: true });
      },
      onError: () => {
        /** @TODO alert error */
      },
    },
  });

  const debouncedCreatePhotoMutate = useMemo(
    () =>
      debounce((data: PhotoCreateRequest) => {
        createPhotoMutate(
          { data },
          {
            onSuccess: (response) => {
              router.push(`/@${response.data.author.username}/photos/${response.data.id}`);
            },
          },
        );
      }, 300),
    [createPhotoMutate, router],
  );

  const debouncedUpdatePhotoMutate = useMemo(
    () =>
      debounce((id: number, data: PhotoUpdateRequest) => {
        updatePhotoMutate(
          {
            id,
            data,
          },
          {
            onSuccess: (response) => {
              router.push(`/@${response.data.author.username}/photos/${response.data.id}`);
            },
          },
        );
      }, 300),
    [router, updatePhotoMutate],
  );

  const onSubmit: SubmitHandler<PhotoCreateRequest> = (body) => {
    if (!isEdit) {
      debouncedCreatePhotoMutate(body);
    } else {
      debouncedUpdatePhotoMutate(photo.id, body);
    }
  };

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;

    uploadPhotoImage({
      data: { image },
    });
  };

  const handleAnimalClick = async () => {
    const animals = await modals.push({
      key: 'select-animal-modal',
      component: SelectAnimalModal,
      props: {
        initialAnimals: selectedAnimals,
      },
    });

    setSelectedAnimals(animals);
    setValue(
      'animalIds',
      animals.map((animal) => animal.id),
      { shouldValidate: true },
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    const normalizedTag = e.currentTarget.value.trim().replace(/\s+/g, ' ');
    e.currentTarget.value = '';
    if (!normalizedTag || tags?.includes(normalizedTag)) return;

    setValue('tags', [...(tags ?? []), normalizedTag]);
  };

  const handleTagRemove = (target: string) => {
    if (!tags) return;

    const filteredTags = tags.filter((tag) => tag !== target);
    setValue('tags', filteredTags);
  };

  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="sticky top-0 flex items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {!isEdit ? '# 반려동물 사진 등록' : '# 반려동물 사진 수정'}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">반려동물의 사진을 공유하고 저장해보세요.</p>
        </div>
        <button
          disabled={!isValid || isUploadPhotoImagePending}
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
        >
          {!isEdit ? '등록하기' : '수정하기'}
        </button>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
        <form className="grid grid-cols-4 gap-8 p-6">
          <div className="col-span-2 flex h-full flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              사진 <span className="text-sm text-red-700">*</span>
            </label>
            <div className="relative">
              {image && (
                <div
                  onClick={handleImageClick}
                  className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800"
                  style={{ aspectRatio: image.width / image.height }}
                >
                  <Image className="object-cover" src={image.path} alt="" sizes="50vw" fill priority />
                </div>
              )}
              {!image && (
                <div
                  onClick={handleImageClick}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800"
                >
                  <LucideCamera size={48} className="text-zinc-400" />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">반려동물 사진을 선택해주세요.</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">30MB 이내의 파일만 업로드 가능해요.</p>
                </div>
              )}
              {isUploadPhotoImagePending && (
                <div className="pointer-events-none absolute inset-0 flex flex-col rounded-lg bg-zinc-950/40 backdrop-blur-[1px]">
                  <div className="mt-auto h-1 overflow-hidden rounded-b-lg bg-zinc-900/60">
                    <div className="h-full w-1/3 animate-[shimmer_1.6s_ease-in-out_infinite] bg-emerald-500" />
                  </div>
                </div>
              )}
            </div>
            <input
              ref={imageRef}
              type="file"
              accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
              onChange={handleImageChange}
              hidden
            />
          </div>
          <div className="col-span-2 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                반려동물 <span className="text-sm text-red-700">*</span>
              </label>
              {selectedAnimals.length === 0 && (
                <div className="relative w-full" onClick={handleAnimalClick}>
                  <div className="absolute right-4 flex h-full cursor-pointer items-center justify-center">
                    <LucideSearch className="h-4 w-4 text-zinc-700" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    placeholder="사진 속 반려동물을 선택해주세요"
                    className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>
              )}
              {selectedAnimals.length > 0 && (
                <div
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-800"
                  onClick={handleAnimalClick}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {selectedAnimals.length === 1 && (
                      <>
                        {selectedAnimals[0]?.thumbnail && (
                          <Image
                            className="h-9 w-9 rounded-full object-cover"
                            src={selectedAnimals[0].thumbnail}
                            alt=""
                            width={36}
                            height={36}
                          />
                        )}
                        {!selectedAnimals[0]?.thumbnail && (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900">
                            {selectedAnimals[0]?.breed.species === 'DOG' && (
                              <LucideDog className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                            )}
                            {selectedAnimals[0]?.breed.species === 'CAT' && (
                              <LucideCat className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                            )}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">{selectedAnimals[0]?.name}</p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">{selectedAnimals[0]?.breed.name}</p>
                        </div>
                      </>
                    )}
                    {selectedAnimals.length > 1 && (
                      <>
                        <div className="flex -space-x-3">
                          {selectedAnimals.slice(0, 3).map((animal) => (
                            <div
                              key={animal.id}
                              className="relative h-9 w-9 rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800"
                            >
                              {animal.thumbnail && (
                                <Image
                                  className="h-full w-full rounded-full object-cover"
                                  src={animal.thumbnail}
                                  alt=""
                                  width={36}
                                  height={36}
                                />
                              )}
                              {!animal.thumbnail && (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                                  {animal.breed.species === 'DOG' && (
                                    <LucideDog className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                  )}
                                  {animal.breed.species === 'CAT' && (
                                    <LucideCat className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                          {selectedAnimals.length > 3 && (
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 ring-2 ring-zinc-100 dark:bg-zinc-700 dark:ring-zinc-800">
                              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                                +{selectedAnimals.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <p className="truncate text-sm font-semibold">
                            {selectedAnimals.map((a) => a.name).join(', ')}
                          </p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            총 {selectedAnimals.length}마리 선택됨
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center justify-center pl-4">
                    <LucideSearch className="h-4 w-4 text-zinc-700" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">제목</label>
              <input
                {...register('title')}
                type="text"
                spellCheck="false"
                autoComplete="off"
                defaultValue={title ?? ''}
                placeholder="사진 제목을 입력해주세요"
                className="rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">설명</label>
              <textarea
                {...register('description')}
                rows={5}
                spellCheck="false"
                autoComplete="off"
                defaultValue={description ?? ''}
                placeholder="사진에 대한 설명을 입력해주세요"
                className="resize-none rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">태그</label>
                <input
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="태그를 입력 후 엔터를 눌러주세요"
                  onKeyDown={handleTagKeyDown}
                  className="rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
                />
              </div>
              {tags && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 rounded-md bg-emerald-100 py-1.5 pr-2 pl-3 text-sm font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    >
                      <span>{`#${tag}`}</span>
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="flex cursor-pointer items-center justify-center rounded-full p-0.5 text-emerald-700/70 hover:bg-emerald-200/70 hover:text-emerald-800 dark:text-emerald-300/70 dark:hover:bg-emerald-800/50 dark:hover:text-emerald-200"
                      >
                        <LucideX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhotoForm;
