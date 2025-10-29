import NotFoundImage from '@/assets/images/404.svg';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-zinc-50 text-center dark:bg-zinc-900">
      <Image className="aspect-square" src={NotFoundImage} alt="" width={300} height={300} priority />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">요청하신 페이지를 찾을 수 없어요.</h1>
        <p className="text-zinc-600 dark:text-zinc-400">주소가 잘못되었거나 더 이상 존재하지 않아요.</p>
      </div>
      <Link
        href={ROUTE_HOME_PAGE}
        className="rounded-lg bg-zinc-200 px-6 py-2 font-medium text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
