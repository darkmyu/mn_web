import { useUserControllerDelete } from '@/api/user';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { useConfirmStore } from '@/stores/confirm';
import { debounce } from 'es-toolkit';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

function SettingAccount() {
  const router = useRouter();
  const { openConfirm, closeConfirm } = useConfirmStore();

  const { mutateAsync: deleteAccountMutateAsync } = useUserControllerDelete({
    mutation: {
      onSuccess: () => {
        router.push(ROUTE_HOME_PAGE);
      },
      onSettled: () => {
        closeConfirm();
      },
    },
  });

  const debouncedDeleteAccountMutate = useMemo(
    () =>
      debounce(() => {
        toast.promise(deleteAccountMutateAsync(), {
          loading: '계정을 삭제하고 있어요...',
          success: '계정이 삭제되었어요!',
          error: '계정 삭제에 실패했어요.',
        });
      }, 300),
    [deleteAccountMutateAsync],
  );

  const handleDeleteButtonClick = () => {
    openConfirm({
      title: '계정을 삭제할까요?',
      description: '삭제된 계정은 복구할 수 없어요.',
      onConfirm: () => debouncedDeleteAccountMutate(),
    });
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
