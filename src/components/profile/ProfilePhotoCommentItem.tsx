import { PhotoCommentResponse } from '@/api/index.schemas';
import {
  getPhotoControllerGetCommentsInfiniteQueryKey,
  photoControllerGetCommentsResponseSuccess,
  usePhotoControllerDeleteComment,
} from '@/api/photo';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { formatDate, formatNumber } from '@/utils/formatters';
import { Popover } from '@base-ui/react/popover';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { LucideChevronDown, LucideEllipsisVertical, LucideReply, LucideSquarePen, LucideTrash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import toast from 'react-hot-toast';
import AuthModal from '../modal/AuthModal';
import ConfirmModal from '../modal/ConfirmModal';
import ProfilePhotoCommentEditor from './ProfilePhotoCommentEditor';
import ProfilePhotoReplyList from './ProfilePhotoReplyList';
import ProfilePhotoReplyListSkeleton from './ProfilePhotoReplyListSkeleton';

interface Props {
  comment: PhotoCommentResponse;
  photoId: number;
}

function ProfilePhotoCommentItem({ comment, photoId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const queryClient = useQueryClient();
  const modals = useModalStore();
  const { user } = useAuthStore();

  const { mutateAsync: deleteCommentMutateAsync } = usePhotoControllerDeleteComment({
    mutation: {
      onSuccess: () => {
        queryClient.setQueryData<InfiniteData<photoControllerGetCommentsResponseSuccess>>(
          getPhotoControllerGetCommentsInfiniteQueryKey(photoId, {}),
          (prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  total: page.data.total - 1 - comment.replyCount,
                  items: page.data.items.filter((item) => item.id !== comment.id),
                },
              })),
            };
          },
        );
      },
    },
  });

  const handleDeleteButtonClick = async () => {
    const confirmed = await modals.push({
      key: 'delete-comment-confirm-modal',
      component: ConfirmModal,
      props: {
        title: '댓글을 삭제할까요?',
        description: '삭제된 댓글은 복구할 수 없어요.',
        confirmText: '삭제',
      },
    });

    if (confirmed) {
      toast.promise(
        deleteCommentMutateAsync({
          id: photoId,
          commentId: comment.id,
        }),
        {
          loading: '댓글을 삭제하고 있어요...',
          success: '댓글이 삭제되었어요!',
          error: '댓글 삭제에 실패했어요.',
        },
      );
    }
  };

  const handleReplyButtonClick = () => {
    if (!user) {
      return modals.push({
        key: 'auth-modal',
        component: AuthModal,
      });
    }

    setIsReplying(!isReplying);
  };

  return (
    <div className="border-zinc-200 not-first:mt-6 not-first:border-t not-first:pt-6 dark:border-zinc-700">
      {!isModify && (
        <div className="flex items-start gap-4">
          <Link href={`/@${comment.author.username}`} className="flex h-9 w-9 items-center justify-center">
            <Image
              className="h-9 w-9 rounded-full object-cover"
              src={comment.author.thumbnail ?? ''}
              alt=""
              width={36}
              height={36}
            />
          </Link>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Link href={`/@${comment.author.username}`} className="text-sm font-medium">
                  {comment.author.nickname}
                </Link>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(comment.createdAt)}</span>
              </div>
              {comment.author.isOwner && (
                <Popover.Root>
                  <Popover.Trigger
                    render={
                      <button className="cursor-pointer rounded-lg p-1 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                        <LucideEllipsisVertical className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                      </button>
                    }
                  />
                  <Popover.Portal>
                    <Popover.Positioner align="end" sideOffset={8}>
                      <Popover.Popup>
                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 shadow-2xl/20 outline-none dark:border-zinc-700 dark:bg-zinc-800">
                          <ul className="flex flex-col">
                            <li
                              className="flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
                              onClick={() => {
                                setIsReplying(false);
                                setIsModify(!isModify);
                              }}
                            >
                              <LucideSquarePen className="h-3.5 w-3.5" />
                              <span className="text-sm">수정하기</span>
                            </li>
                            <Popover.Close
                              nativeButton={false}
                              render={
                                <li
                                  className="flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/40"
                                  onClick={handleDeleteButtonClick}
                                >
                                  <LucideTrash2 className="h-3.5 w-3.5" />
                                  <span className="text-sm">삭제하기</span>
                                </li>
                              }
                            />
                          </ul>
                        </div>
                      </Popover.Popup>
                    </Popover.Positioner>
                  </Popover.Portal>
                </Popover.Root>
              )}
            </div>
            <div className="text-sm whitespace-pre-wrap">{comment.content}</div>
            <div className="flex items-center gap-4 pt-3">
              <button
                className="flex cursor-pointer items-center gap-1 text-zinc-500 dark:text-zinc-400"
                onClick={handleReplyButtonClick}
              >
                <span className="text-sm">답글 작성</span>
                <LucideReply className="h-3.5 w-3.5" />
              </button>
              {comment.replyCount > 0 && (
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 text-emerald-600 dark:text-emerald-500"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <span className="text-sm font-medium">{`답글 ${formatNumber(comment.replyCount)}개`}</span>
                  <LucideChevronDown className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {isModify && (
        <ProfilePhotoCommentEditor
          photoId={photoId}
          commentId={comment.id}
          initialContent={comment.content}
          onSuccess={() => setIsModify(false)}
          onCancel={() => setIsModify(false)}
        />
      )}
      {isReplying && (
        <div className="pt-4 pl-13">
          <ProfilePhotoCommentEditor
            photoId={photoId}
            parentId={comment.id}
            onSuccess={() => {
              setIsExpanded(true);
              setIsReplying(false);
            }}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}
      {isExpanded && (
        <div className="pl-13">
          <Suspense fallback={<ProfilePhotoReplyListSkeleton />}>
            <ProfilePhotoReplyList photoId={photoId} parentId={comment.id} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoCommentItem;
