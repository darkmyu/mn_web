import { $api } from '@/api';
import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { Cat, Dog, LogOut, LucideLogIn, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from 'radix-ui';
import { Modal } from '../modal';
import LoginModal from '../modal/contents/LoginModal';

function SidebarProfile() {
  const { user, setUser } = useAuthStore();

  const { mutate: logoutMutate } = $api.useMutation('post', '/api/v1/auth/logout', {
    onSuccess: () => {
      setUser(null);
    },
  });

  if (!user) {
    return (
      <Modal.Root>
        <Modal.Trigger>
          <div className="flex cursor-pointer items-center justify-center">
            <LucideLogIn className="text-zinc-500" />
          </div>
        </Modal.Trigger>
        <Modal.Content>
          <LoginModal />
        </Modal.Content>
      </Modal.Root>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {user.profileImage && (
          <Image
            className="h-8 w-8 cursor-pointer rounded-full object-cover"
            src={user.profileImage}
            alt=""
            width={32}
            height={32}
          />
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="flex w-80 flex-col rounded-lg bg-zinc-50 p-4 shadow-2xl/50 outline-none dark:bg-zinc-800"
          side="right"
          sideOffset={16}
          align="end"
          alignOffset={32}
        >
          <Popover.Close asChild>
            <Link
              href={`/@${user.username}`}
              className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
            >
              {user.profileImage && (
                <Image
                  className="h-12 w-12 cursor-pointer rounded-full object-cover"
                  src={user.profileImage}
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
          </Popover.Close>

          <hr className="my-4 text-zinc-300 dark:text-zinc-600" />

          <div className="flex flex-col gap-1 px-2">
            <div className="flex items-center gap-2">
              <Dog className="text-zinc-500 dark:text-zinc-300" size={16} />
              <div className="flex text-sm text-zinc-500 dark:text-zinc-300">
                <p>빵이</p>
                <p className="before:mx-1 before:content-['•']">믹스견</p>
                <p className="before:mx-1 before:content-['•']">10개월</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cat className="text-zinc-500 dark:text-zinc-300" size={16} />
              <div className="flex text-sm text-zinc-500 dark:text-zinc-300">
                <p>빵삼</p>
                <p className="before:mx-1 before:content-['•']">믹스묘</p>
                <p className="before:mx-1 before:content-['•']">1살(+4개월)</p>
              </div>
            </div>
          </div>

          <hr className="my-4 text-zinc-300 dark:text-zinc-600" />

          <div className="flex flex-col">
            <Link
              href={ROUTE_SETTINGS_PAGE}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-3 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
            >
              <Settings className="text-zinc-500 dark:text-zinc-300" size={20} />
              <p className="text-sm font-semibold">설정</p>
            </Link>
            <div
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-3 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
              onClick={() => logoutMutate({})}
            >
              <LogOut className="text-zinc-500 dark:text-zinc-300" size={20} />
              <p className="text-sm font-semibold">로그아웃</p>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default SidebarProfile;
