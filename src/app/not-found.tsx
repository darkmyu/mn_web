import NotFoundImage from '@/assets/images/404.svg';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-zinc-50 px-4 text-center sm:gap-10 dark:bg-zinc-900">
      <Image className="aspect-square w-48 sm:w-72" src={NotFoundImage} alt="" width={300} height={300} priority />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">요청하신 페이지를 찾을 수 없어요.</h1>
        <p className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          주소가 잘못되었거나 더 이상 존재하지 않아요.
        </p>
      </div>
    </main>
  );
}
