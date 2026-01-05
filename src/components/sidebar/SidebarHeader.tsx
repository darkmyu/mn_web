import { ROUTE_HOME_LATEST_PAGE, ROUTE_HOME_PAGE } from '@/constants/route';
import { LucideArrowLeft, LucidePawPrint } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

function SidebarHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === ROUTE_HOME_PAGE || pathname === ROUTE_HOME_LATEST_PAGE;

  const handleButtonClick = () => {
    if (isHomePage) {
      return router.push(ROUTE_HOME_PAGE);
    }
    router.back();
  };

  return (
    <div className="absolute top-0 left-0 flex h-16 w-full items-center justify-center">
      <button className="flex cursor-pointer items-center justify-center" onClick={handleButtonClick}>
        {isHomePage && <LucidePawPrint className="h-6 w-6 text-zinc-800 dark:text-zinc-200" />}
        {!isHomePage && <LucideArrowLeft className="h-6 w-6 text-zinc-800 dark:text-zinc-200" />}
      </button>
    </div>
  );
}

export default SidebarHeader;
