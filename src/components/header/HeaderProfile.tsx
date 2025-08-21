import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import Image from 'next/image';
import Link from 'next/link';
import LoginModal from '../modal/LoginModal';

function HeaderProfile() {
  const { open } = useModalStore();
  const { user } = useAuthStore();

  if (!user) {
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
    <Link href={`/@${user.username}`}>
      <Image
        className="h-9 w-9 rounded-full object-cover"
        src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
        alt=""
        width={36}
        height={36}
      />
    </Link>
  );
}

export default HeaderProfile;
