import { $api } from '@/api';
import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { Cat, Dog, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from 'radix-ui';
import LoginModal from '../modal/LoginModal';

function HeaderProfile() {
  const { open } = useModalStore();
  const { user, setUser } = useAuthStore();

  const { mutate: logoutMutate } = $api.useMutation('post', '/api/v1/auth/logout', {
    onSuccess: () => {
      setUser(null);
    },
  });

  if (!user) {
    return (
      <button
        className="cursor-pointer rounded-lg bg-emerald-600 px-4.5 py-2.5 text-sm text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 dark:bg-emerald-800 dark:hover:bg-emerald-800/90"
        onClick={() => open(LoginModal)}
      >
        로그인
      </button>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Image
          className="h-9 w-9 cursor-pointer rounded-full object-cover"
          src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
          alt=""
          width={36}
          height={36}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="flex w-80 flex-col rounded-lg bg-zinc-50 p-4 shadow-2xl/50 outline-none dark:bg-zinc-800"
          sideOffset={8}
          align="end"
        >
          <Link
            href={`/@${user.username}`}
            className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-zinc-100 hover:dark:bg-zinc-700/40"
          >
            <Image
              className="h-12 w-12 cursor-pointer rounded-full object-cover"
              src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
              alt=""
              width={48}
              height={48}
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold">{user.nickname}</p>
              <p className="text-sm">{`@${user.username}`}</p>
            </div>
          </Link>

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

export default HeaderProfile;
