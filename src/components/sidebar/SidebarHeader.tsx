import { ROUTE_HOME_PAGE } from '@/constants/route';
import { LucidePawPrint } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SidebarHeader() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(ROUTE_HOME_PAGE);
  };

  return (
    <div className="absolute top-0 left-0 flex h-16 w-full items-center justify-center">
      <button className="flex cursor-pointer items-center justify-center" onClick={handleButtonClick}>
        <LucidePawPrint className="h-6 w-6 text-zinc-800 dark:text-zinc-200" />
      </button>
    </div>
  );
}

export default SidebarHeader;
