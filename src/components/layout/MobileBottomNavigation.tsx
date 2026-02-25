'use client';

import {
  ROUTE_COLLECTIONS_PAGE,
  ROUTE_COMMUNITY_PAGE,
  ROUTE_HOME_LATEST_PAGE,
  ROUTE_HOME_PAGE,
  ROUTE_PHOTOS_WRITE_PAGE,
} from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MdAccountCircle,
  MdAdd,
  MdExplore,
  MdMessage,
  MdOutlineAccountCircle,
  MdOutlineExplore,
  MdOutlineMessage,
  MdOutlinePermMedia,
  MdPermMedia,
} from 'react-icons/md';
import AuthModal from '../modal/AuthModal';

function MobileBottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const modals = useModalStore();

  const isHomePage = pathname === ROUTE_HOME_PAGE || pathname === ROUTE_HOME_LATEST_PAGE;
  const isCollectionsPage = pathname === ROUTE_COLLECTIONS_PAGE;
  const isCommunityPage = pathname === ROUTE_COMMUNITY_PAGE;
  const isProfilePage = pathname === `/@${user?.username}`;

  const handlePhotosWriteButtonClick = () => {
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    router.push(ROUTE_PHOTOS_WRITE_PAGE);
  };

  const handleProfileButtonClick = () => {
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    router.push(`/@${user.username}`);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 flex h-15 justify-evenly border-t border-zinc-200 bg-zinc-50 px-4 lg:hidden dark:border-zinc-700 dark:bg-zinc-900">
      <Link href={ROUTE_HOME_PAGE} className="flex flex-1 items-center justify-center text-zinc-800 dark:text-zinc-200">
        {isHomePage && <MdExplore className="h-6 w-6" />}
        {!isHomePage && <MdOutlineExplore className="h-6 w-6" />}
      </Link>
      <Link
        href={ROUTE_COLLECTIONS_PAGE}
        className="flex flex-1 items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        {isCollectionsPage && <MdPermMedia className="h-6 w-6" />}
        {!isCollectionsPage && <MdOutlinePermMedia className="h-6 w-6" />}
      </Link>
      <button
        onClick={handlePhotosWriteButtonClick}
        className="flex flex-1 items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        <MdAdd className="h-6 w-6" />
      </button>
      <Link
        href={ROUTE_COMMUNITY_PAGE}
        className="flex flex-1 items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        {isCommunityPage && <MdMessage className="h-6 w-6" />}
        {!isCommunityPage && <MdOutlineMessage className="h-6 w-6" />}
      </Link>
      <button
        onClick={handleProfileButtonClick}
        className="flex flex-1 items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        {!user && (
          <>
            {isProfilePage && <MdAccountCircle className="h-6 w-6" />}
            {!isProfilePage && <MdOutlineAccountCircle className="h-6 w-6" />}
          </>
        )}
        {user && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full">
            <Image
              src={user?.thumbnail ?? ''}
              alt=""
              width={24}
              height={24}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        )}
      </button>
    </nav>
  );
}

export default MobileBottomNavigation;
