import NotFoundImage from '@/assets/images/404.svg';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-zinc-50 text-center dark:bg-zinc-900">
      <Image className="aspect-square" src={NotFoundImage} alt="" width={300} height={300} priority />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">요청하신 페이지를 찾을 수 없어요.</h1>
        <p className="text-zinc-600 dark:text-zinc-400">주소가 잘못되었거나 더 이상 존재하지 않아요.</p>
      </div>
    </main>
  );
}
