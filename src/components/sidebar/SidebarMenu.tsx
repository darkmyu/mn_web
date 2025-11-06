import { ROUTE_COMMUNITY_PAGE, ROUTE_HOME_PAGE } from '@/constants/route';
import { LucideHouse, LucideMessageSquareText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="grid gap-6">
      <Link href={ROUTE_HOME_PAGE}>
        <button className="flex cursor-pointer items-center justify-center">
          <LucideHouse
            className={`${pathname !== ROUTE_HOME_PAGE ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'}`}
          />
        </button>
      </Link>
      <Link href={ROUTE_COMMUNITY_PAGE}>
        <button className="flex cursor-pointer items-center justify-center">
          <LucideMessageSquareText
            className={`${pathname !== ROUTE_COMMUNITY_PAGE ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'}`}
          />
        </button>
      </Link>
    </div>
  );
}

export default SidebarMenu;
