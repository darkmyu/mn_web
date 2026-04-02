'use client';

import { useAuthControllerLogout } from '@/api/auth';
import { useUserControllerDelete } from '@/api/user';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ConfirmModal from '../modal/ConfirmModal';

function SettingAccount() {
  const router = useRouter();
  const modals = useModalStore();
  const { setUser } = useAuthStore();

  const { mutate: logoutMutate } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        setUser(null);
        router.push(ROUTE_HOME_PAGE);
      },
    },
  });

  const { mutateAsync: deleteAccountMutateAsync } = useUserControllerDelete({
    mutation: {
      onSuccess: () => {
        setUser(null);
        router.push(ROUTE_HOME_PAGE);
      },
    },
  });

  const handleDeleteButtonClick = async () => {
    const confirmed = await modals.push({
      key: 'delete-account-confirm-modal',
      component: ConfirmModal,
      props: {
        title: '계정을 삭제할까요?',
        description: '삭제된 계정은 복수할 수 없어요.',
        confirmText: '삭제',
      },
    });

    if (confirmed) {
      toast.promise(deleteAccountMutateAsync(), {
        loading: '계정을 삭제하고 있어요...',
        success: '계정이 삭제되었어요!',
        error: '계정 삭제에 실패했어요.',
      });
    }
  };

  return (
    <div className="animate-fade-in flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/50 px-6 py-4 max-lg:flex-col max-lg:items-start max-lg:gap-3 max-lg:p-4 dark:border-zinc-800 dark:bg-zinc-900/10">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">로그아웃</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">로그아웃하면 다시 로그인이 필요해요.</p>
        </div>
        <button
          onClick={() => logoutMutate()}
          className="cursor-pointer rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors duration-300 hover:bg-zinc-300 max-lg:w-full dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
        >
          로그아웃
        </button>
      </div>
      <div className="flex w-full items-center justify-between rounded-lg border border-red-200 bg-red-50/50 px-6 py-4 max-lg:flex-col max-lg:items-start max-lg:gap-3 max-lg:p-4 dark:border-red-900/50 dark:bg-red-900/10">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-red-900 dark:text-red-400">계정 삭제</p>
          <p className="text-xs text-red-700 dark:text-red-500">계정을 삭제하면 모든 데이터가 영구적으로 지워져요.</p>
        </div>
        <button
          onClick={handleDeleteButtonClick}
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-600/90 max-lg:w-full dark:bg-red-800 dark:hover:bg-red-800/90"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default SettingAccount;
