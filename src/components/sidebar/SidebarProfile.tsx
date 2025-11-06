import { $api } from '@/api';
import { ROUTE_ANIMALS_WRITE_PAGE, ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { formatAge } from '@/utils/formatters';
import { Cat, Dog, LogOut, LucideLogIn, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover } from 'radix-ui';
import { Modal } from '../modal';
import LoginModal from '../modal/contents/LoginModal';

function SidebarProfile() {
  const { user, animals, setUser } = useAuthStore();

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
          sideOffset={32}
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

          <div className="flex flex-col gap-4 px-2">
            {animals.length > 0 && (
              <div className="flex flex-col gap-1">
                {animals.map((animal) => (
                  <div className="flex items-center gap-2" key={animal.id}>
                    {animal.breed.species === 'DOG' && <Dog className="text-zinc-500 dark:text-zinc-300" size={16} />}
                    {animal.breed.species === 'CAT' && <Cat className="text-zinc-500 dark:text-zinc-300" size={16} />}
                    <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-300">
                      <p className="shrink-0">{animal.name}</p>
                      <p className="shrink-0 text-zinc-300">|</p>
                      <p className="shrink-0">{animal.breed.name}</p>
                      <p className="shrink-0 text-zinc-300">|</p>
                      <p className="shrink-0">{formatAge(animal.birthday)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Popover.Close asChild>
              <Link
                href={ROUTE_ANIMALS_WRITE_PAGE}
                className="w-full cursor-pointer rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-center text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-600 dark:bg-transparent dark:hover:bg-zinc-700/40"
              >
                반려동물 등록하기
              </Link>
            </Popover.Close>
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
