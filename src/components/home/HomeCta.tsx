function HomeCta() {
  return (
    <div className="col-2 my-24 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 px-8 py-10 text-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:from-emerald-700 dark:to-emerald-900">
          <div className="text-center">
            <h3 className="mb-3 text-2xl font-bold">여러분의 반려동물도 참여해 보세요!</h3>
            <p className="mb-6 text-lg leading-relaxed text-emerald-100">
              사랑스러운 반려동물 사진을 업로드하고 랭킹에 도전해보세요
            </p>
            <button className="cursor-pointer rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              지금 참여하기 →
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition-all duration-300 hover:border-emerald-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-emerald-600">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-xl text-white transition-transform duration-300 group-hover:scale-110">
                ❤️
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">투표하기</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">마음에 드는 반려동물에게 투표해보세요</p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition-all duration-300 hover:border-emerald-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-emerald-600">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-xl text-white transition-transform duration-300 group-hover:scale-110">
                💬
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">커뮤니티</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">반려동물 이야기를 나누어보세요</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-200 p-6 dark:from-zinc-800 dark:to-zinc-700">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-xl font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">1,247</div>
              <div className="text-xs text-zinc-600 md:text-sm dark:text-zinc-400">참여한 반려동물</div>
            </div>
            <div className="h-8 w-px bg-zinc-300 md:h-12 dark:bg-zinc-600"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">43,892</div>
              <div className="text-xs text-zinc-600 md:text-sm dark:text-zinc-400">총 투표수</div>
            </div>
            <div className="h-8 w-px bg-zinc-300 md:h-12 dark:bg-zinc-600"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">5,230</div>
              <div className="text-xs text-zinc-600 md:text-sm dark:text-zinc-400">활성 사용자</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCta;
