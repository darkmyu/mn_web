import { ProfileResponse } from '@/api/index.schemas';
import {
  getPhotoControllerGetCommentsInfiniteQueryKey,
  getPhotoControllerGetRepliesInfiniteQueryKey,
  photoControllerGetCommentsResponseSuccess,
  photoControllerGetRepliesResponseSuccess,
  usePhotoControllerCreateComment,
} from '@/api/photo';
import { useCommentForm } from '@/hooks/forms/comment';
import { useAuthStore } from '@/stores/auth';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'es-toolkit';
import Image from 'next/image';
import { useMemo } from 'react';

interface Props {
  photoId: number;
  parentId?: number;
  mention?: ProfileResponse;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function ProfilePhotoCommentEditor({ photoId, parentId, mention, onSuccess, onCancel }: Props) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { isValid },
  } = useCommentForm({
    content: '',
    parentId,
    mentionId: mention?.id,
  });

  const content = watch('content');

  const { mutate: createMutate, isPending: isCreatePending } = usePhotoControllerCreateComment({
    mutation: {
      onSuccess: ({ data: comment }) => {
        if (!parentId) {
          queryClient.setQueryData<InfiniteData<photoControllerGetCommentsResponseSuccess>>(
            getPhotoControllerGetCommentsInfiniteQueryKey(photoId, {}),
            (prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                pages: prev.pages.map((page, index) =>
                  index === prev.pages.length - 1
                    ? {
                        ...page,
                        data: {
                          ...page.data,
                          total: page.data.total + 1,
                          items: [...page.data.items, comment],
                        },
                      }
                    : {
                        ...page,
                        data: {
                          ...page.data,
                          total: page.data.total + 1,
                        },
                      },
                ),
              };
            },
          );
        } else {
          queryClient.setQueryData<InfiniteData<photoControllerGetRepliesResponseSuccess>>(
            getPhotoControllerGetRepliesInfiniteQueryKey(photoId, parentId, {}),
            (prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                pages: prev.pages.map((page, index) =>
                  index === prev.pages.length - 1
                    ? {
                        ...page,
                        data: {
                          ...page.data,
                          total: page.data.total + 1,
                          items: [...page.data.items, comment],
                        },
                      }
                    : page,
                ),
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
                    total: page.data.total + 1,
                    items: page.data.items.map((item) =>
                      item.id === parentId
                        ? {
                            ...item,
                            replyCount: item.replyCount + 1,
                          }
                        : item,
                    ),
                  },
                })),
              };
            },
          );
        }
      },
    },
  });

  const debouncedCreateMutate = useMemo(
    () =>
      debounce((id: number, data) => {
        createMutate(
          { id, data },
          {
            onSuccess: () => {
              reset();
              onSuccess?.();
            },
          },
        );
      }, 500),

    [createMutate, onSuccess, reset],
  );

  const onSubmit = handleSubmit((body) => {
    debouncedCreateMutate(photoId, body);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 items-center justify-center">
          <Image
            className="h-9 w-9 rounded-full object-cover"
            src={user?.profileImage ?? ''}
            alt=""
            width={36}
            height={36}
          />
        </div>
        <div className="relative flex min-h-10 flex-1">
          <textarea
            {...register('content')}
            className="field-sizing-content min-h-full w-full resize-none border-none text-sm outline-none"
            placeholder="소중한 댓글을 남겨주세요"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            <span className={content.length > 1000 ? 'text-red-500' : ''}>{content.length}</span>
            {` / 1000`}
          </span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isCreatePending}
              className="cursor-pointer text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              취소
            </button>
          )}
          <button
            type="submit"
            disabled={!isValid || isCreatePending}
            className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-1 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
          >
            등록
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfilePhotoCommentEditor;
