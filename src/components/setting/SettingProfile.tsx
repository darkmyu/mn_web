import { UserUpdateRequest } from '@/api/index.schemas';
import { useUserControllerReadSuspense, useUserControllerThumbnail, useUserControllerUpdate } from '@/api/user';
import { useProfileForm } from '@/hooks/forms/profile';
import { useAuthStore } from '@/stores/auth';
import { debounce } from 'es-toolkit';
import { LucideSquarePen } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../modal';

function SettingProfile() {
  const {
    data: { data: user },
  } = useUserControllerReadSuspense();

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useProfileForm({
    nickname: user.nickname,
    about: user.about,
    thumbnail: user.thumbnail,
  });

  const thumbnail = watch('thumbnail');
  const nickname = watch('nickname');
  const about = watch('about');

  const { setUser } = useAuthStore();
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
    <div className="animate-fade-in scrollbar-hide flex h-full flex-col overflow-y-auto">
      <div className="flex flex-1 flex-col gap-12 p-8">
        <div
          className="relative flex h-24 w-24 cursor-pointer items-center justify-center"
          onClick={handleThumbnailClick}
        >
          <Image className="rounded-full object-cover" src={thumbnail ?? ''} sizes="25vw" alt="" fill priority />
          <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-black">
            <LucideSquarePen className="h-3.5 w-3.5 text-white" />
          </div>
          <input
            ref={thumbnailRef}
            type="file"
            accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
            onChange={handleThumbnailChange}
            hidden
          />
        </div>
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="nickname" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                이름
              </label>
              <div
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:ring-0 dark:text-zinc-100 ${
                  false
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
              <label htmlFor="about" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-8 py-6 dark:border-zinc-700 dark:bg-zinc-900">
        <Modal.Close
          render={
            <button className="cursor-pointer rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
              닫기
            </button>
          }
        />
        <button
          onClick={onSubmit}
          disabled={!isValid || !isDirty || isProfileThumbnailPending}
          className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-emerald-50 transition-colors hover:bg-emerald-600/90 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default SettingProfile;
