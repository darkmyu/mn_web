'use client';

import { useUserControllerDelete } from '@/api/user';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { LucideAlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ConfirmModal from '../modal/ConfirmModal';

function MobileSettingAccount() {
  const router = useRouter();
  const modals = useModalStore();
  const { setUser } = useAuthStore();

  const { mutateAsync: deleteAccountMutateAsync } = useUserControllerDelete({
    mutation: {
      onSuccess: () => {
        setUser(null);
        modals.clear();
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
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-6 rounded-2xl border border-red-100 bg-red-50/30 p-5 dark:border-red-900/20 dark:bg-red-900/10">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900/30">
            <LucideAlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-red-900 dark:text-red-400">계정 삭제</h3>
            <p className="text-xs leading-relaxed text-red-700/80 dark:text-red-500/80">
              계정을 삭제하면 모든 데이터가 영구적으로 지워져요.
            </p>
          </div>
        </div>
        <button
          onClick={handleDeleteButtonClick}
          className="w-full cursor-pointer rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-[0.98] dark:bg-red-800 dark:hover:bg-red-700"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default MobileSettingAccount;
