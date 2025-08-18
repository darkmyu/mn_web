'use client';

import { AuthRegisterRequest } from '@/api/auth';
import { useAuthRegisterForm } from '@/hooks/forms/auth';
import { useAuthRegisterMutation } from '@/hooks/queries/auth';
import { SubmitHandler } from 'react-hook-form';

function OnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthRegisterForm();

  const mutation = useAuthRegisterMutation();

  const onSubmit: SubmitHandler<AuthRegisterRequest> = (data) => {
    mutation.mutate(data);
  };

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="gap4 flex w-md flex-col gap-20 rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">환영합니다!</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">사용하실 이름과 고유명을 입력해주세요.</p>
        </div>
        <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
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
              <div className="flex flex-col gap-4">
                <label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {`고유명 `}
                  <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  {...register('username')}
                  id="username"
                  type="text"
                  autoComplete="off"
                  className={`rounded-lg border px-4 py-3 text-sm placeholder-zinc-400 focus:ring-0 focus:outline-none dark:text-zinc-100 dark:placeholder-zinc-500 ${
                    errors.username
                      ? 'border-red-400 focus:border-red-400 dark:border-red-400 dark:focus:border-red-400'
                      : 'border-zinc-200 focus:border-zinc-400 dark:border-zinc-700 dark:focus:border-zinc-500'
                  }`}
                />
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
            className="cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:outline-none dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:focus:ring-emerald-800"
          >
            가입 완료
          </button>
        </form>
      </div>
    </main>
  );
}

export default OnboardingForm;
