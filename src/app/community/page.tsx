import ConstructionImage from '@/assets/images/construction.svg';
import Image from 'next/image';

export default function CommunityPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-zinc-50 px-4 text-center sm:gap-10 dark:bg-zinc-900">
      <Image className="w-48 sm:w-72" src={ConstructionImage} alt="" width={300} height={300} priority />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">서비스 준비 중이에요.</h1>
        <p className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          더 나은 서비스를 위해 열심히 만들고 있어요.
          <br />
          조금만 기다려주세요!
        </p>
      </div>
    </div>
  );
}
