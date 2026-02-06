'use client';

import { useAuthControllerLogout } from '@/api/auth';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { ModalControllerProps } from '@/stores/modal';
import {
  LucideCircleUserRound,
  LucideLoaderCircle,
  LucideLogOut,
  LucidePalette,
  LucideUserRoundPen,
  LucideX,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Modal } from '.';
import SettingAccount from '../setting/SettingAccount';
import SettingDisplay from '../setting/SettingDisplay';
import SettingProfile from '../setting/SettingProfile';

type Props = ModalControllerProps<boolean>;

type Tab = 'profile' | 'account' | 'display';

function SettingModal({ resolve }: Props) {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const { mutate: logoutMutate } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        setUser(null);
        router.push(ROUTE_HOME_PAGE);
      },
    },
  });

  return (
    <Modal.Root open={true} onOpenChange={() => resolve(false)}>
      <Modal.Popup>
        <div className="flex h-[800px] w-[800px] max-w-[95vw] flex-col overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">설정 페이지</h2>
            <Modal.Close
              render={
                <button className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <LucideX className="h-5 w-5" />
                </button>
              }
            />
          </div>
          <div className="flex flex-1 overflow-hidden">
            <aside className="w-64 border-r border-zinc-200 p-4 dark:border-zinc-700">
              <nav className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 ${
                    activeTab === 'profile'
                      ? 'bg-zinc-100 dark:bg-zinc-700/40'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-700/40'
                  }`}
                >
                  <LucideUserRoundPen className="h-4 w-4" />
                  <span className="font-medium">프로필</span>
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 ${
                    activeTab === 'account'
                      ? 'bg-zinc-100 dark:bg-zinc-700/40'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-700/40'
                  }`}
                >
                  <LucideCircleUserRound className="h-4 w-4" />
                  <span className="font-medium">내 계정</span>
                </button>
                <button
                  onClick={() => setActiveTab('display')}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 ${
                    activeTab === 'display'
                      ? 'bg-zinc-100 dark:bg-zinc-700/40'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-700/40'
                  }`}
                >
                  <LucidePalette className="h-4 w-4" />
                  <span className="font-medium">디스플레이</span>
                </button>
                <hr className="text-zinc-200 dark:text-zinc-700" />
                <Modal.Close
                  render={
                    <button
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
                      onClick={() => logoutMutate()}
                    >
                      <LucideLogOut className="h-4 w-4" />
                      <span className="font-medium">로그아웃</span>
                    </button>
                  }
                />
              </nav>
            </aside>
            <main className="flex-1 overflow-auto">
              {activeTab === 'profile' && (
                <Suspense
                  fallback={
                    <div className="flex h-[90%] items-center justify-center">
                      <LucideLoaderCircle className="h-8 w-8 animate-spin text-zinc-500 duration-500 dark:text-zinc-400" />
                    </div>
                  }
                >
                  <SettingProfile />
                </Suspense>
              )}
              {activeTab === 'account' && <SettingAccount />}
              {activeTab === 'display' && <SettingDisplay />}
            </main>
          </div>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export default SettingModal;
