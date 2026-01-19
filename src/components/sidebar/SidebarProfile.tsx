import { useAuthControllerLogout } from '@/api/auth';
import { ROUTE_HOME_PAGE, ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useDialogStore } from '@/stores/dialog';
import { Popover } from '@base-ui/react/popover';
import { LogOut, LucideLogIn, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SidebarProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { setIsAuthDialogOpen } = useDialogStore();

  const { mutate: logoutMutate } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        setUser(null);
        router.push(ROUTE_HOME_PAGE);
      },
    },
  });

  if (!user) {
    return (
      <div className="flex cursor-pointer items-center justify-center" onClick={() => setIsAuthDialogOpen(true)}>
        <LucideLogIn className="text-zinc-500" />
      </div>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        nativeButton={false}
        render={
          <Image
            className="h-8 w-8 cursor-pointer rounded-full object-cover"
            src={user.profileImage ?? ''}
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
              }
            />
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
                onClick={() => logoutMutate()}
              >
                <LogOut className="text-zinc-500 dark:text-zinc-300" size={20} />
                <p className="text-sm font-semibold">로그아웃</p>
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default SidebarProfile;
