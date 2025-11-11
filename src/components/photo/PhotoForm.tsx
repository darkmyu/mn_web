'use client';

import { usePhotoForm } from '@/hooks/forms/photo';
import { LucideCamera, LucideSearch, LucideX } from 'lucide-react';

function PhotoForm() {
  const { watch, register } = usePhotoForm();

  const tags = watch('tags');

  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="sticky top-0 flex items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"># 반려동물 사진 등록</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">반려동물의 사진을 공유하고 저장해보세요.</p>
        </div>
        <button className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:focus:ring-emerald-800 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700">
          등록하기
        </button>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
        <form className="grid grid-cols-4 gap-8 p-6">
          <div className="col-span-2 flex aspect-square flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              사진 <span className="text-sm text-red-700">*</span>
            </label>
            <div className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
              <LucideCamera size={48} className="text-zinc-400" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                여기로 사진을 끌어다 놓거나 클릭하여 선택해주세요.
              </p>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                동물 <span className="text-sm text-red-700">*</span>
              </label>
              <div className="relative w-full">
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
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">제목</label>
              <input
                type="text"
                autoComplete="off"
                placeholder="사진 제목을 입력해주세요"
                className="rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">설명</label>
              <textarea
                rows={4}
                placeholder="사진에 대한 설명을 입력해주세요"
                className="rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">태그</label>
              <input
                type="text"
                autoComplete="off"
                placeholder="태그를 입력 후 엔터를 눌러주세요"
                className="rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm placeholder-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags &&
                  tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 rounded-md bg-emerald-100 py-1.5 pr-2 pl-3 text-sm font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    >
                      <span>{`#${tag}`}</span>
                      <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center rounded-full p-0.5 text-emerald-700/70 hover:bg-emerald-200/70 hover:text-emerald-800 dark:text-emerald-300/70 dark:hover:bg-emerald-800/50 dark:hover:text-emerald-200"
                      >
                        <LucideX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhotoForm;
