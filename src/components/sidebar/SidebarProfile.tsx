import { useAuthControllerLogout } from '@/api/auth';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { Popover } from '@base-ui/react/popover';
import { LogOut, LucideLogIn, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthModal from '../modal/AuthModal';
import SettingModal from '../modal/SettingModal';

function SidebarProfile() {
  const router = useRouter();
  const modals = useModalStore();
  const { user, setUser } = useAuthStore();

  const { mutate: logoutMutate } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        setUser(null);
        router.push(ROUTE_HOME_PAGE);
      },
    },
  });

  const handleSettingButtonClick = async () => {
    await modals.push({
      key: 'setting-modal',
      component: SettingModal,
    });
  };

  const handleLoginButtonClick = async () => {
    await modals.push({
      key: 'auth-modal',
      component: AuthModal,
    });
  };

  if (!user) {
    return (
      <button className="flex cursor-pointer items-center justify-center" onClick={handleLoginButtonClick}>
        <LucideLogIn className="text-zinc-500" />
      </button>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        nativeButton={false}
        render={
          <Image
            className="h-8 w-8 cursor-pointer rounded-full object-cover"
            src={user.thumbnail ?? ''}
            alt=""
            width={32}
            height={32}
          />
        }
      />
      <Popover.Portal>
        <Popover.Positioner side="right" sideOffset={32} align="end" alignOffset={32}>
          <Popover.Popup className="flex w-80 flex-col rounded-lg bg-zinc-50 p-4 shadow-2xl/50 outline-none dark:bg-zinc-800">
            <Popover.Close
              nativeButton={false}
              render={
                <Link
                  href={`/@${user.username}`}
                  className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
                >
                  {user.thumbnail && (
                    <Image
                      className="h-12 w-12 cursor-pointer rounded-full object-cover"
                      src={user.thumbnail}
                      alt=""
                      width={48}
                      height={48}
                    />
                  )}
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-bold">{user.nickname}</p>
                    <p className="text-sm">{`@${user.username}`}</p>
                  </div>
                </Link>
              }
            />
            <hr className="my-4 text-zinc-300 dark:text-zinc-600" />
            <div className="flex flex-col">
              <Popover.Close
                render={
                  <button
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-3 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
                    onClick={handleSettingButtonClick}
                  >
                    <Settings className="text-zinc-500 dark:text-zinc-300" size={20} />
                    <p className="text-sm font-semibold">설정</p>
                  </button>
                }
              />
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-3 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
                onClick={() => logoutMutate()}
              >
                <LogOut className="text-zinc-500 dark:text-zinc-300" size={20} />
                <p className="text-sm font-semibold">로그아웃</p>
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default SidebarProfile;
