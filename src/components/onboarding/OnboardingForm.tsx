'use client';

import { useAuthControllerCheckDuplicateUsername, useAuthControllerRegister } from '@/api/auth';
import { AuthRegisterRequest } from '@/api/index.schemas';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { useAuthRegisterForm } from '@/hooks/forms/auth';
import { useAuthStore } from '@/stores/auth';
import { debounce } from 'es-toolkit';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

function OnboardingForm() {
  const router = useRouter();
  const { setUser: setProfile } = useAuthStore();
  const [isCheckDuplicateUsername, setIsCheckDuplicateUsername] = useState(false);

  const {
    watch,
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useAuthRegisterForm();

  const username = watch('username');

  const { mutate: registerMutate } = useAuthControllerRegister({
    mutation: {
      onSuccess: (response) => {
        setProfile(response.data.profile);
      },
    },
  });

  const { mutate: checkDuplicateUsernameMutate } = useAuthControllerCheckDuplicateUsername({
    mutation: {
      onSuccess: () => {
        setIsCheckDuplicateUsername(true);
      },
      onError: () => {
        setIsCheckDuplicateUsername(false);
        setError('username', {
          type: 'duplicate',
          message: '이미 사용중인 고유명이에요. 다른 이름을 입력해주세요.',
        });
      },
    },
  });

  const debouncedRegisterMutate = useMemo(
    () =>
      debounce((data: AuthRegisterRequest) => {
        registerMutate(
          { data },
          {
            onSuccess: () => {
              router.push(ROUTE_HOME_PAGE);
            },
          },
        );
      }, 500),
    [registerMutate, router],
  );

  const debouncedCheckDuplicateUsernameMutate = useMemo(
    () =>
      debounce((username: string) => {
        checkDuplicateUsernameMutate({
          data: { username },
        });
      }, 500),
    [checkDuplicateUsernameMutate],
  );

  const onSubmit: SubmitHandler<AuthRegisterRequest> = (body) => {
    debouncedRegisterMutate(body);
  };

  useEffect(() => {
    if (username && !errors.username) {
      setIsCheckDuplicateUsername(false);
      debouncedCheckDuplicateUsernameMutate(username);
    }
  }, [debouncedCheckDuplicateUsernameMutate, errors.username, username]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="flex w-md flex-col gap-20 rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">환영합니다!</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">사용하실 이름과 고유명을 입력해주세요.</p>
        </div>
        <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="nickname" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {`이름 `}
                  <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  {...register('nickname')}
                  id="nickname"
                  type="text"
                  autoComplete="off"
                  className={`rounded-lg border px-4 py-3 text-sm placeholder-zinc-400 focus:ring-0 focus:outline-none dark:text-zinc-100 dark:placeholder-zinc-500 ${
                    errors.nickname
                      ? 'border-red-400 focus:border-red-400 dark:border-red-400 dark:focus:border-red-400'
                      : 'border-zinc-200 focus:border-zinc-400 dark:border-zinc-700 dark:focus:border-zinc-500'
                  }`}
                />
              </div>
              <p className={`text-sm ${errors.nickname ? 'text-red-400' : 'text-zinc-400'}`}>
                {errors.nickname ? errors.nickname.message : '사용하실 이름을 입력해주세요. 설정에서 변경할 수 있어요.'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {`고유명 `}
                  <span className="text-sm text-red-700">*</span>
                </label>
                <div
                  className={`flex items-center gap-0.5 rounded-lg border px-4 py-3 text-sm focus-within:ring-0 ${
                    errors.username
                      ? 'border-red-400 focus-within:border-red-400 dark:border-red-400 dark:focus-within:border-red-400'
                      : 'border-zinc-200 focus-within:border-zinc-400 dark:border-zinc-700 dark:focus-within:border-zinc-500'
                  }`}
                >
                  {username && <span className="text-zinc-400 dark:text-zinc-500">@</span>}
                  <input
                    {...register('username')}
                    id="username"
                    type="text"
                    autoComplete="off"
                    className="flex-1 bg-transparent placeholder-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>
              </div>
              <p className={`text-sm ${errors.username ? 'text-red-400' : 'text-zinc-400'}`}>
                {errors.username
                  ? errors.username.message
                  : '중복되지 않는 고유한 이름이에요. 설정에서 변경할 수 없어요.'}
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid || !isCheckDuplicateUsername}
            className="cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:focus:ring-emerald-800 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
          >
            가입 완료
          </button>
        </form>
      </div>
    </main>
  );
}

export default OnboardingForm;
