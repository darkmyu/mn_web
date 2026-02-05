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
    <div className="animate-fade-in p-8">
      <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-red-900 dark:text-red-400">계정 삭제</p>
          <p className="text-xs text-red-700 dark:text-red-500">계정을 삭제하면 모든 데이터가 영구적으로 지워져요.</p>
        </div>
        <button
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-600/90 dark:bg-red-800 dark:hover:bg-red-800/90"
          onClick={handleDeleteButtonClick}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default SettingAccount;
