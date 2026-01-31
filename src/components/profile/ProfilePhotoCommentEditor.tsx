import Image from 'next/image';

function ProfilePhotoCommentEditor() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 items-center justify-center">
          <Image
            className="h-9 w-9 rounded-full object-cover"
            src="https://pub-9d149cdc6c92422ab589264b4c9661b2.r2.dev/animals/2026-01-16/9obq9_rW8GhzNAtIOf7HF/_%20(11).jpeg"
            alt=""
            width={36}
            height={36}
          />
        </div>
        <div className="relative flex min-h-10 flex-1">
          <textarea
            className="field-sizing-content min-h-full w-full resize-none border-none text-sm outline-none"
            placeholder="소중한 댓글을 남겨주세요"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">0/1000</span>
          <button className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-1 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700">
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoCommentEditor;
