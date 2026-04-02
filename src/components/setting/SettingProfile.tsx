'use client';

import { UserSocialLinkRequest, UserSocialLinkRequestType, UserUpdateRequest } from '@/api/index.schemas';
import { useUserControllerReadSuspense, useUserControllerThumbnail, useUserControllerUpdate } from '@/api/user';
import GoogleLogo from '@/assets/images/google.png';
import KakaoLogo from '@/assets/images/kakao.png';
import NaverLogo from '@/assets/images/naver.png';
import { useProfileForm } from '@/hooks/forms/profile';
import { useAuthStore } from '@/stores/auth';
import { convertOptimizeImage } from '@/utils/converters/convertOptimizeImage';
import { optimizeImage } from '@/utils/optimizeImage';
import { debounce } from 'es-toolkit';
import { LucideLink, LucideMail, LucideSquarePen } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaXTwitter } from 'react-icons/fa6';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

function SettingProfile() {
  const {
    data: { data: profile },
  } = useUserControllerReadSuspense();

  const { setUser } = useAuthStore();

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useProfileForm({
    nickname: profile.nickname,
    about: profile.about,
    thumbnail: profile.thumbnail,
    email: profile.socialLinks.find((socialLink) => socialLink.type === 'EMAIL')?.url ?? '',
    website: profile.socialLinks.find((socialLink) => socialLink.type === 'WEBSITE')?.url ?? '',
    instagram: profile.socialLinks.find((socialLink) => socialLink.type === 'INSTAGRAM')?.url ?? '',
    youtube: profile.socialLinks.find((socialLink) => socialLink.type === 'YOUTUBE')?.url ?? '',
    x: profile.socialLinks.find((socialLink) => socialLink.type === 'X')?.url ?? '',
  });

  const thumbnail = watch('thumbnail');
  const nickname = watch('nickname');
  const about = watch('about');

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [isThumbnailConverting, setIsThumbnailConverting] = useState(false);

  const { mutate: uploadProfileThumbnailMutate, isPending: isProfileThumbnailPending } = useUserControllerThumbnail({
    mutation: {
      onSuccess: (response) => {
        setValue('thumbnail', response.data.path, { shouldDirty: true });
      },
      onError: () => {
        toast.error('이미지 업로드에 실패했어요.');
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
    const socialLinks: UserSocialLinkRequest[] = [
      { type: UserSocialLinkRequestType.EMAIL, url: body.email },
      { type: UserSocialLinkRequestType.WEBSITE, url: body.website },
      { type: UserSocialLinkRequestType.YOUTUBE, url: body.youtube },
      { type: UserSocialLinkRequestType.INSTAGRAM, url: body.instagram },
      { type: UserSocialLinkRequestType.X, url: body.x },
    ].filter((socialLink) => socialLink.url.trim() !== '');

    const payload: UserUpdateRequest = {
      nickname: body.nickname,
      about: body.about,
      thumbnail: body.thumbnail,
      socialLinks,
    };

    debouncedUpdateProfileMutate(payload);
  });

  const handleThumbnailClick = () => {
    thumbnailRef.current?.click();
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsThumbnailConverting(true);
    try {
      const thumbnail = await convertOptimizeImage(file);

      uploadProfileThumbnailMutate({
        data: { thumbnail },
      });
    } catch {
      toast.error('이미지 업로드에 실패했어요.');
    } finally {
      setIsThumbnailConverting(false);
    }
  };

  return (
    <div className="animate-fade-in flex w-full flex-col">
      <div className="flex flex-col gap-12">
        <div
          onClick={handleThumbnailClick}
          className="relative flex size-49 cursor-pointer items-center justify-center max-lg:self-center"
        >
          <Image
            className="size-full rounded-full object-cover"
            src={optimizeImage({ src: thumbnail ?? '', width: 280 })}
            alt=""
            width={196}
            height={196}
            priority
          />
          {(isProfileThumbnailPending || isThumbnailConverting) && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-zinc-950/40 backdrop-blur-[1px]">
              <div className="relative h-full w-full">
                <div className="absolute inset-1 rounded-full border border-white/20" />
                <div className="absolute inset-1 animate-[spin_1.2s_linear_infinite] rounded-full border-2 border-transparent border-t-emerald-400 border-l-emerald-500" />
              </div>
            </div>
          )}
          <div className="absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-full bg-black">
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="nickname" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{`${nickname.length}/30`}</span>
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">이메일</label>
              <div className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100/50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                {profile.provider === 'GOOGLE' && <Image src={GoogleLogo} alt="" width={16} height={16} />}
                {profile.provider === 'NAVER' && <Image src={NaverLogo} alt="" width={16} height={16} />}
                {profile.provider === 'KAKAO' && <Image src={KakaoLogo} alt="" width={16} height={16} />}
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{profile.email}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">소셜 정보</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus-within:border-zinc-500">
                  <LucideMail className="size-4 text-zinc-500" />
                  <input
                    {...register('email')}
                    type="text"
                    autoComplete="off"
                    placeholder="이메일 주소를 입력해주세요"
                    className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus-within:border-zinc-500">
                  <LucideLink className="size-4 text-zinc-500" />
                  <input
                    {...register('website')}
                    type="text"
                    autoComplete="off"
                    placeholder="홈페이지 주소를 입력해주세요"
                    className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus-within:border-zinc-500">
                  <FiYoutube className="text-zinc-500" />
                  <input
                    {...register('youtube')}
                    type="text"
                    autoComplete="off"
                    placeholder="유튜브 주소를 입력해주세요"
                    className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus-within:border-zinc-500">
                  <FiInstagram className="text-zinc-500" />
                  <input
                    {...register('instagram')}
                    type="text"
                    autoComplete="off"
                    placeholder="인스타그램 주소를 입력해주세요"
                    className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus-within:border-zinc-500">
                  <FaXTwitter className="text-zinc-500" />
                  <input
                    {...register('x')}
                    type="text"
                    autoComplete="off"
                    placeholder="X (트위터) 주소를 입력해주세요"
                    className="flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none dark:placeholder-zinc-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr className="my-8 border-zinc-200 dark:border-zinc-700" />
      <div className="flex items-center justify-end gap-3 bg-zinc-50 dark:bg-zinc-900">
        <button
          onClick={onSubmit}
          disabled={!isValid || !isDirty || isProfileThumbnailPending || isThumbnailConverting}
          className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-emerald-50 transition-colors hover:bg-emerald-600/90 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default SettingProfile;
