import { ProfileResponse } from '@/api/types';
import { ROUTE_SETTINGS_PAGE } from '@/constants/route';
import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';

interface Props {
  target: ProfileResponse;
}

function ProfileActions({ target }: Props) {
  const { profile } = useAuthStore();
  const isOwner = profile?.username === target.username;

  if (isOwner) {
    return (
      <Link
        href={ROUTE_SETTINGS_PAGE}
        className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        프로필 편집
      </Link>
    );
  }

  return (
    <button className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-1.5 text-sm font-semibold hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700">
      팔로우
    </button>
  );
}

export default ProfileActions;
