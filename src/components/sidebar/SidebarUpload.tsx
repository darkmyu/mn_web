import { ROUTE_PHOTOS_WRITE_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import { Plus } from 'lucide-react';
import Link from 'next/link';

function SidebarUpload() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <Link className="flex items-center justify-center" href={ROUTE_PHOTOS_WRITE_PAGE}>
      <Plus className="h-6 w-6 cursor-pointer text-gray-500" />
    </Link>
  );
}

export default SidebarUpload;
