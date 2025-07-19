import Image from 'next/image';
import { RocketIcon } from '../vector';

function HomeRanking() {
  return (
    <div className="col-2 mb-24 flex flex-col gap-16">
      <div className="flex flex-col gap-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <RocketIcon width={24} height={24} />
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">TOP 3 반려동물</span>
        </div>
        <p className="text-md font-medium text-zinc-600 dark:text-zinc-400">
          가장 사랑받는 반려동물들을 지금 만나보세요!
        </p>
      </div>
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="group relative mb-4 h-96 w-76 cursor-pointer">
            <div className="absolute -top-3 -left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-300 to-gray-500 shadow-lg">
              <span className="text-xl font-bold text-white">2</span>
            </div>
            <div className="h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-lg ring-2 ring-gray-400/30 transition-all duration-300 group-hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
              <div className="relative h-4/6 w-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop'}
                  alt={'image'}
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="flex h-2/6 flex-col justify-center p-4">
                <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-zinc-50">몽실</h3>
                <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">골든 리트리버</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">sugar function wow</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-200">2위</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-16 w-44 items-center justify-center rounded-t-lg bg-gradient-to-r from-gray-300 to-gray-500 shadow-lg">
            <span className="text-lg font-bold text-white">15,420</span>
          </div>
        </div>

        <div className="flex -translate-y-6 transform flex-col items-center">
          <div className="group relative mb-4 h-96 w-76 cursor-pointer">
            <div className="absolute -top-3 -left-3 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-xl">
              <span className="text-xl font-bold text-white">1</span>
            </div>
            <div className="h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-xl ring-2 ring-yellow-400/30 transition-all duration-300 group-hover:shadow-2xl dark:border-zinc-700 dark:bg-zinc-800">
              <div className="relative h-4/6 w-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop'}
                  alt={'image'}
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="flex h-2/6 flex-col justify-center p-4">
                <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">빵이</h3>
                <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">말티폼</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">sugar function wow</span>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">1위</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-24 w-52 items-center justify-center rounded-t-lg bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-xl">
            <span className="text-xl font-bold text-white">14,230</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="group relative mb-4 h-96 w-76 cursor-pointer">
            <div className="absolute -top-3 -left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-600 to-amber-800 shadow-lg">
              <span className="text-xl font-bold text-white">3</span>
            </div>
            <div className="h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-lg ring-2 ring-amber-400/30 transition-all duration-300 group-hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
              <div className="relative h-4/6 w-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop'}
                  alt={'image'}
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="flex h-2/6 flex-col justify-center p-4">
                <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-zinc-50">몰리</h3>
                <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">포메라니안</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">sugar function wow</span>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">3위</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-12 w-44 items-center justify-center rounded-t-lg bg-gradient-to-r from-amber-600 to-amber-800 shadow-lg">
            <span className="text-base font-bold text-white">13,890</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRanking;
