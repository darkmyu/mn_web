import { usePhotoControllerGetRepliesSuspenseInfinite } from '@/api/photo';
import ProfilePhotoReplyItem from './ProfilePhotoReplyItem';
import ProfilePhotoReplyListSkeleton from './ProfilePhotoReplyListSkeleton';

interface Props {
  photoId: number;
  commentId: number;
}

function ProfilePhotoReplyList({ photoId, commentId }: Props) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = usePhotoControllerGetRepliesSuspenseInfinite(
    photoId,
    commentId,
    {},
    {
      query: {
        getNextPageParam: (lastPage) => (lastPage.data.hasNextPage ? lastPage.data.cursor : undefined),
      },
    },
  );

  const replies = data.pages.flatMap((page) => page.data.items);

  return (
    <div className="flex flex-col">
      {replies.map((reply) => (
        <ProfilePhotoReplyItem key={reply.id} reply={reply} />
      ))}

      {isFetchingNextPage && <ProfilePhotoReplyListSkeleton />}

      {hasNextPage && !isFetchingNextPage && (
        <button
          className="group flex w-fit cursor-pointer items-center gap-3 pt-4 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          onClick={() => fetchNextPage()}
        >
          <div className="h-px w-7 bg-zinc-300 transition-colors group-hover:bg-zinc-400 dark:bg-zinc-600 dark:group-hover:bg-zinc-500" />
          <span>답글 더보기</span>
        </button>
      )}
    </div>
  );
}

export default ProfilePhotoReplyList;
