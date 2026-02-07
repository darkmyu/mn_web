'use client';

import { usePhotoControllerGetCommentsSuspenseInfinite } from '@/api/photo';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { formatNumber } from '@/utils/formatters';
import { uniqBy } from 'es-toolkit';
import { LucideInfo } from 'lucide-react';
import AuthModal from '../modal/AuthModal';
import ProfilePhotoCommentEditor from './ProfilePhotoCommentEditor';
import ProfilePhotoCommentItem from './ProfilePhotoCommentItem';
import ProfilePhotoCommentListSkeleton from './ProfilePhotoCommentListSkeleton';

interface Props {
  id: number;
}

function ProfilePhotoCommentList({ id }: Props) {
  const { user } = useAuthStore();
  const modals = useModalStore();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = usePhotoControllerGetCommentsSuspenseInfinite(
    id,
    {},
    {
      query: {
        getNextPageParam: (lastPage) => (lastPage.data.hasNextPage ? lastPage.data.cursor : undefined),
      },
    },
  );

  const total = data.pages[0]?.data.total ?? 0;

  const comments = uniqBy(
    data.pages.flatMap((page) => page.data.items),
    (comment) => comment.id,
  );

  const handleLoginButtonClick = () => {
    modals.push({
      key: 'auth-modal',
      component: AuthModal,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold sm:text-base">{`댓글 ${formatNumber(total)}개`}</span>
      <div className="flex flex-col gap-4">
        {user && <ProfilePhotoCommentEditor photoId={id} />}
        {!user && (
          <button
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-neutral-100 px-4 py-5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-200/50 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700/40"
            onClick={handleLoginButtonClick}
          >
            <LucideInfo className="h-4 w-4" />
            로그인 후 댓글을 작성할 수 있어요.
          </button>
        )}
        <div className="flex flex-col p-4">
          {comments.map((comment) => (
            <ProfilePhotoCommentItem key={comment.id} comment={comment} photoId={id} />
          ))}
        </div>

        {isFetchingNextPage && <ProfilePhotoCommentListSkeleton />}

        {hasNextPage && !isFetchingNextPage && (
          <button
            className="group flex cursor-pointer items-center gap-4 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            onClick={() => fetchNextPage()}
          >
            <div className="h-px flex-1 bg-neutral-200 transition-colors group-hover:bg-neutral-300 dark:bg-neutral-800 dark:group-hover:bg-neutral-700" />
            댓글 더보기
            <div className="h-px flex-1 bg-neutral-200 transition-colors group-hover:bg-neutral-300 dark:bg-neutral-800 dark:group-hover:bg-neutral-700" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePhotoCommentList;
