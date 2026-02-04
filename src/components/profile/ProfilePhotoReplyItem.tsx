import { PhotoCommentResponse } from '@/api/index.schemas';
import {
  getPhotoControllerGetCommentsInfiniteQueryKey,
  getPhotoControllerGetRepliesInfiniteQueryKey,
  photoControllerGetCommentsResponseSuccess,
  photoControllerGetRepliesResponseSuccess,
  usePhotoControllerDeleteComment,
} from '@/api/photo';
import { useConfirmStore } from '@/stores/confirm';
import { formatDate } from '@/utils/formatters';
import { Popover } from '@base-ui/react/popover';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { LucideEllipsisVertical, LucideReply, LucideSquarePen, LucideTrash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ProfilePhotoCommentEditor from './ProfilePhotoCommentEditor';

interface Props {
  reply: PhotoCommentResponse;
  photoId: number;
  parentId: number;
}

function ProfilePhotoReplyItem({ reply, photoId, parentId }: Props) {
  const [isReplying, setIsReplying] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const { openConfirm, closeConfirm } = useConfirmStore();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCommentMutateAsync } = usePhotoControllerDeleteComment({
    mutation: {
      onSuccess: () => {
        queryClient.setQueryData<InfiniteData<photoControllerGetRepliesResponseSuccess>>(
          getPhotoControllerGetRepliesInfiniteQueryKey(photoId, parentId, {}),
          (prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  total: page.data.total - 1,
                  items: page.data.items.filter((item) => item.id !== reply.id),
                },
              })),
            };
          },
        );

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
                  total: page.data.total - 1,
                  items: page.data.items.map((item) =>
                    item.id === parentId
                      ? {
                          ...item,
                          replyCount: item.replyCount - 1,
                        }
                      : item,
                  ),
                },
              })),
            };
          },
        );
      },
    },
  });

  const handleDeleteButtonClick = () => {
    openConfirm({
      title: '답글을 삭제할까요?',
      description: '삭제된 답글은 복구할 수 없어요.',
      onConfirm: () =>
        toast.promise(
          deleteCommentMutateAsync(
            {
              id: photoId,
              commentId: reply.id,
            },
            {
              onSuccess: () => {
                closeConfirm();
              },
            },
          ),
          {
            loading: '답글을 삭제하고 있어요...',
            success: '답글이 삭제되었어요!',
            error: '답글 삭제에 실패했어요.',
          },
        ),
    });
  };

  return (
    <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">
      {!isModify && (
        <div className="flex items-start gap-4">
          <Link href={`/@${reply.author.username}`} className="flex h-6 w-6 items-center justify-center">
            <Image
              className="h-6 w-6 rounded-full object-cover"
              src={reply.author.thumbnail ?? ''}
              alt=""
              width={24}
              height={24}
            />
          </Link>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Link href={`/@${reply.author.username}`} className="text-sm font-medium">
                  {reply.author.nickname}
                </Link>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(reply.createdAt)}</span>
              </div>
              {reply.author.isOwner && (
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
            <div className="text-sm whitespace-pre-wrap">
              {reply.mention && (
                <Link
                  href={`/@${reply.mention.username}`}
                  className="mr-1 font-medium text-emerald-500 dark:text-emerald-400"
                >
                  {`@${reply.mention.nickname}`}
                </Link>
              )}
              {reply.content}
            </div>
            <div className="flex items-center gap-4 pt-3">
              <div
                className="flex cursor-pointer items-center gap-1 text-zinc-500 dark:text-zinc-400"
                onClick={() => setIsReplying(!isReplying)}
              >
                <span className="text-sm">답글 작성</span>
                <LucideReply className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      )}
      {isModify && (
        <ProfilePhotoCommentEditor
          photoId={photoId}
          parentId={parentId}
          commentId={reply.id}
          mention={reply.mention}
          initialContent={reply.content}
          onSuccess={() => setIsModify(false)}
          onCancel={() => setIsModify(false)}
        />
      )}
      {isReplying && (
        <div className="pt-4 pl-10">
          <ProfilePhotoCommentEditor
            photoId={photoId}
            parentId={parentId}
            mention={reply.author}
            onSuccess={() => setIsReplying(false)}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoReplyItem;
