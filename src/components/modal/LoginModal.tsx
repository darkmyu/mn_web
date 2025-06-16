import GoogleLogo from '@/assets/images/google.png';
import KakaoLogo from '@/assets/images/kakao.png';
import NaverLogo from '@/assets/images/naver.png';
import { MailIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function LoginModal() {
  return (
    <div className="w-[24rem] rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">당신의 반려동물을 보여주세요! 🐶🐱</h1>
          <span className="text-sm text-zinc-500">
            로그인 시{' '}
            <Link href="/terms" className="font-medium">
              이용약관
            </Link>{' '}
            및{' '}
            <Link href="/privacy" className="font-medium">
              개인정보 처리방침
            </Link>
            에 동의됩니다.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <button className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50">
            <Image src={GoogleLogo} alt="google" width={16} height={16} />
            <span className="text-sm font-medium dark:text-zinc-400">구글 계정으로 시작하기</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50">
            <Image src={NaverLogo} alt="naver" width={16} height={16} />
            <span className="text-sm font-medium dark:text-zinc-400">네이버 계정으로 시작하기</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50">
            <Image src={KakaoLogo} alt="kakao" width={16} height={16} />
            <span className="text-sm font-medium dark:text-zinc-400">카카오 계정으로 시작하기</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50">
            <MailIcon size={16} />
            <span className="text-sm font-medium dark:text-zinc-400">이메일 계정으로 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
