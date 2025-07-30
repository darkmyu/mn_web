import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import Image from 'next/image';
import Link from 'next/link';
import LoginModal from '../modal/LoginModal';

function HeaderProfile() {
  const { open } = useModalStore();
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return (
      <button
        className="cursor-pointer rounded-lg bg-emerald-600 px-4.5 py-2.5 text-sm text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 dark:bg-emerald-800 dark:hover:bg-emerald-800/90"
        onClick={() => open(LoginModal)}
      >
        로그인
      </button>
    );
  }

  return (
    <Link href="/@bammyu">
      <Image
        className="rounded-full"
        src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop"
        alt=""
        width={28}
        height={28}
      />
    </Link>
  );
}

export default HeaderProfile;
