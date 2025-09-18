'use client';

import { useAuthStore } from '@/stores/auth';
import { Plus } from 'lucide-react';

function HeaderUpload() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <button className="flex items-center justify-center">
      <Plus className="h-6 w-6 cursor-pointer text-gray-500" />
    </button>
  );
}

export default HeaderUpload;
