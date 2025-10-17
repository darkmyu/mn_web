'use client';

import { AnimalGender, AnimalSpecies, BreedResponse } from '@/api/types';
import { useAnimalCreateForm } from '@/hooks/forms/animal';
import { Camera, Search } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../modal';
import BreedModal from '../modal/contents/BreedModal';

function AnimalForm() {
  const {
    watch,
    reset,
    register,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useAnimalCreateForm();

  const birthday = watch('birthday');
  const selectedGender = watch('gender');
  const [selectedSpecies, setSelectedSpecie] = useState<AnimalSpecies>('DOG');
  const [selectedBreed, setSelectedBreed] = useState<BreedResponse | null>(null);

  const handleGenderClick = (gender: AnimalGender) => {
    setValue('gender', gender);
  };

  const handleSpeciesClick = (species: AnimalSpecies) => {
    setSelectedSpecie(species);
    setSelectedBreed(null);

    const values = getValues();
    reset({ ...values, breedId: undefined });
  };

  const handleBreedClick = (breed: BreedResponse) => {
    setValue('breedId', breed.id, { shouldValidate: true });
    setSelectedBreed(breed);
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = value.replace(/(\d{4})(\d)/, '$1-$2').replace(/(\d{4}-\d{2})(\d)/, '$1-$2');

    setValue('birthday', formatted, { shouldValidate: true });
  };

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="flex w-md flex-col gap-10 rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">반려동물 등록</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">반려동물의 정보를 입력해주세요.</p>
        </div>
        <form className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-32 w-32 cursor-pointer">
              <div className="h-full w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black">
                <Camera size={20} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
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
              <Modal>
                <Modal.Trigger>
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
                <Modal.Content>
                  <BreedModal
                    selectedSpecies={selectedSpecies}
                    selectedBreed={selectedBreed}
                    onBreedClick={handleBreedClick}
                  />
                </Modal.Content>
              </Modal>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                이름 <span className="text-sm text-red-700">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                autoComplete="off"
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
                    selectedGender === 'MALE'
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
                    selectedGender === 'FEMALE'
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
          <button
            type="submit"
            disabled={!isValid}
            className="cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:focus:ring-emerald-800 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
          >
            등록하기
          </button>
        </form>
      </div>
    </main>
  );
}

export default AnimalForm;
