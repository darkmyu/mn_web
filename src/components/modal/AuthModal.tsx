'use client';

import { getAuthControllerGoogleUrl, getAuthControllerKakaoUrl, getAuthControllerNaverUrl } from '@/api/auth';
import GoogleLogo from '@/assets/images/google.png';
import KakaoLogo from '@/assets/images/kakao.png';
import NaverLogo from '@/assets/images/naver.png';
import AuthSheet from '@/components/sheet/AuthSheet';
import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalControllerProps } from '@/stores/modal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from '.';

type Props = ModalControllerProps<boolean>;

function AuthModal({ resolve }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const isLaptop = useMediaQuery(LAPTOP_QUERY);

  const handleOpenChange = () => {
    setIsOpen(false);
  };

  const handleOpenChangeComplete = () => {
    if (!isOpen) {
      resolve(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${getAuthControllerGoogleUrl()}?redirect=${window.location.href}`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${getAuthControllerNaverUrl()}?redirect=${window.location.href}`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${getAuthControllerKakaoUrl()}?redirect=${window.location.href}`;
  };

  if (isLaptop) {
    return (
      <AuthSheet
        isOpen={isOpen}
        onClose={handleOpenChange}
        onCloseEnd={handleOpenChangeComplete}
        onGoogleLogin={handleGoogleLogin}
        onNaverLogin={handleNaverLogin}
        onKakaoLogin={handleKakaoLogin}
      />
    );
  }

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange} onOpenChangeComplete={handleOpenChangeComplete}>
      <Modal.Popup className="w-[24rem] p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium">당신의 반려동물을 보여주세요! 🐶🐱</h1>
            <span className="text-sm text-zinc-500">
              로그인 시{' '}
              <Modal.Close nativeButton={false} render={<Link href="/terms" className="font-medium" />}>
                이용약관
              </Modal.Close>{' '}
              및{' '}
              <Modal.Close nativeButton={false} render={<Link href="/privacy" className="font-medium" />}>
                개인정보 처리방침
              </Modal.Close>
              에 동의됩니다.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50"
              onClick={handleGoogleLogin}
            >
              <Image src={GoogleLogo} alt="google" width={16} height={16} />
              <span className="text-sm font-medium dark:text-zinc-400">구글 계정으로 시작하기</span>
            </button>
            <button
              className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50"
              onClick={handleNaverLogin}
            >
              <Image src={NaverLogo} alt="naver" width={16} height={16} />
              <span className="text-sm font-medium dark:text-zinc-400">네이버 계정으로 시작하기</span>
            </button>
            <button
              className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50"
              onClick={handleKakaoLogin}
            >
              <Image src={KakaoLogo} alt="kakao" width={16} height={16} />
              <span className="text-sm font-medium dark:text-zinc-400">카카오 계정으로 시작하기</span>
            </button>
            {/* <button className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-zinc-200/50 p-2 text-sm dark:bg-zinc-800/50">
            <MailIcon size={16} />
            <span className="text-sm font-medium dark:text-zinc-400">이메일 계정으로 시작하기</span>
          </button> */}
          </div>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export default AuthModal;
