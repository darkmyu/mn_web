'use client';

import { UserUpdateRequest } from '@/api/index.schemas';
import { useUserControllerThumbnail, useUserControllerUpdate } from '@/api/user';
import { useProfileForm } from '@/hooks/forms/profile';
import { useAuthStore } from '@/stores/auth';
import { debounce } from 'es-toolkit';
import { LucideSquarePen } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import toast from 'react-hot-toast';

function MobileSettingProfile() {
  const { user, setUser } = useAuthStore();

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useProfileForm(
    user && {
      nickname: user.nickname,
      about: user.about,
      thumbnail: user.thumbnail,
    },
  );

  const thumbnail = watch('thumbnail');
  const nickname = watch('nickname');
  const about = watch('about');

  const thumbnailRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadProfileThumbnailMutate, isPending: isProfileThumbnailPending } = useUserControllerThumbnail({
    mutation: {
      onSuccess: (response) => {
        setValue('thumbnail', response.data.path);
      },
    },
  });

  const { mutateAsync: updateProfileMutateAsync } = useUserControllerUpdate({
    mutation: {
      onSuccess: ({ data: profile }) => {
        setUser(profile);
        reset({
          nickname: profile.nickname,
          about: profile.about,
          thumbnail: profile.thumbnail,
        });
      },
    },
  });

  const debouncedUpdateProfileMutate = useMemo(
    () =>
      debounce((data: UserUpdateRequest) => {
        toast.promise(updateProfileMutateAsync({ data }), {
          loading: '프로필을 저장하고 있어요...',
          success: '프로필이 저장되었어요!',
          error: '프로필 저장에 실패했어요.',
        });
      }, 300),
    [updateProfileMutateAsync],
  );

  const onSubmit = handleSubmit((body) => {
    debouncedUpdateProfileMutate(body);
  });

  const handleThumbnailClick = () => {
    thumbnailRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = e.target.files?.[0];
    if (!thumbnail) return;

    uploadProfileThumbnailMutate({
      data: { thumbnail },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col gap-10 p-6 pb-25">
        <div className="flex justify-center">
          <div
            className="relative flex h-28 w-28 cursor-pointer items-center justify-center"
            onClick={handleThumbnailClick}
          >
            <Image
              className="rounded-full object-cover shadow-md"
              src={thumbnail ?? ''}
              sizes="30vw"
              alt=""
              fill
              priority
            />
            <div className="absolute right-0 bottom-0 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 shadow-lg dark:bg-zinc-100">
              <LucideSquarePen className="h-4 w-4 text-zinc-100 dark:text-zinc-900" />
            </div>
            <input
              ref={thumbnailRef}
              type="file"
              accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
              onChange={handleThumbnailChange}
              hidden
            />
          </div>
        </div>
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="nickname" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                이름
              </label>
              <div
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:ring-0 dark:text-zinc-100 ${
                  errors.nickname
                    ? 'border-red-400 focus-within:border-red-400 dark:border-red-400 dark:focus-within:border-red-400'
                    : 'border-zinc-200 focus-within:border-zinc-400 dark:border-zinc-700 dark:focus-within:border-zinc-500'
                }`}
              >
                <input
                  {...register('nickname', {
                    onChange: (e) => {
                      if (e.target.value.length > 30) {
                        e.target.value = e.target.value.slice(0, 30);
                        setValue('nickname', e.target.value);
                      }
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  placeholder="사용하실 이름을 입력해주세요"
                  className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                />
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{`${nickname?.length}/30`}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="about" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                소개
              </label>
              <div className="flex min-h-30 flex-col gap-3 rounded-lg border border-zinc-200 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-0 dark:border-zinc-700 dark:focus-within:border-zinc-500">
                <textarea
                  {...register('about', {
                    onChange: (e) => {
                      if (e.target.value.length > 1000) {
                        e.target.value = e.target.value.slice(0, 1000);
                        setValue('about', e.target.value);
                      }
                    },
                  })}
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="반려동물과 함께하는 소중한 일상을 소개해주세요"
                  className="field-sizing-content flex-1 resize-none bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                />
                <div className="flex justify-end">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">{`${about?.length}/1000`}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent p-4 pt-10 dark:from-zinc-900 dark:via-zinc-900">
        <button
          onClick={onSubmit}
          disabled={!isValid || !isDirty || isProfileThumbnailPending}
          className="w-full cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default MobileSettingProfile;
