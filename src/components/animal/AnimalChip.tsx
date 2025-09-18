import Image from 'next/image';

function AnimalChip() {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-full bg-zinc-100 p-1.5 pr-4 dark:bg-zinc-800">
      <div className="relative h-9 w-9">
        <Image
          className="rounded-full object-cover"
          src="https://pub-80ea7a041b9d49848ef0daecc4392a3b.r2.dev/KakaoTalk_Photo_2025-08-01-15-06-34%20010.jpeg"
          sizes="2vw"
          alt=""
          fill
        />
      </div>
      <div>
        <p className="text-sm font-semibold">빵이</p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">포메라니안</p>
      </div>
    </div>
  );
}

export default AnimalChip;
