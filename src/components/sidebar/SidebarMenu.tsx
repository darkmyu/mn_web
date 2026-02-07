import {
  ROUTE_COLLECTIONS_PAGE,
  ROUTE_COMMUNITY_PAGE,
  ROUTE_HOME_LATEST_PAGE,
  ROUTE_HOME_PAGE,
} from '@/constants/route';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdExplore,
  MdMessage,
  MdOutlineExplore,
  MdOutlineMessage,
  MdOutlinePermMedia,
  MdPermMedia,
} from 'react-icons/md';

function SidebarMenu() {
  const pathname = usePathname();

  const isHomePage = pathname === ROUTE_HOME_PAGE || pathname === ROUTE_HOME_LATEST_PAGE;
  const isCollectionsPage = pathname === ROUTE_COLLECTIONS_PAGE;
  const isCommunityPage = pathname === ROUTE_COMMUNITY_PAGE;

  return (
    <div className="grid gap-6">
      <Link
        href={ROUTE_HOME_PAGE}
        className="flex cursor-pointer items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        {isHomePage && <MdExplore className="h-6 w-6" />}
        {!isHomePage && <MdOutlineExplore className="h-6 w-6" />}
      </Link>
      <Link
        href={ROUTE_COLLECTIONS_PAGE}
        className="flex cursor-pointer items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        {isCollectionsPage && <MdPermMedia className="h-6 w-6" />}
        {!isCollectionsPage && <MdOutlinePermMedia className="h-6 w-6" />}
      </Link>
      <Link
        href={ROUTE_COMMUNITY_PAGE}
        className="flex cursor-pointer items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        {isCommunityPage && <MdMessage className="h-6 w-6" />}
        {!isCommunityPage && <MdOutlineMessage className="h-6 w-6" />}
      </Link>
    </div>
  );
}

export default SidebarMenu;
