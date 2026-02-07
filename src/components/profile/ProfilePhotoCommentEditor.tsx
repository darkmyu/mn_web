import { PhotoCommentCreateRequest, PhotoCommentResponseMention } from '@/api/index.schemas';
import {
  getPhotoControllerGetCommentsInfiniteQueryKey,
  getPhotoControllerGetRepliesInfiniteQueryKey,
  photoControllerGetCommentsResponseSuccess,
  photoControllerGetRepliesResponseSuccess,
  usePhotoControllerCreateComment,
  usePhotoControllerUpdateComment,
} from '@/api/photo';
import { useCommentForm } from '@/hooks/forms/comment';
import { useAuthStore } from '@/stores/auth';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'es-toolkit';
import Image from 'next/image';
import React, { useMemo } from 'react';

interface Props {
  photoId: number;
  parentId?: number;
  commentId?: number;
  mention?: PhotoCommentResponseMention;
  initialContent?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function ProfilePhotoCommentEditor({
  photoId,
  parentId,
  commentId,
  mention,
  initialContent = '',
  onSuccess,
  onCancel,
}: Props) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const mentionPrefix = mention ? `@${mention.nickname} ` : '';

  const {
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useCommentForm({
    content: mentionPrefix + initialContent,
    parentId,
    mentionId: mention?.id,
  });

  const isModify = !!initialContent;
  const content = watch('content');
  const mentionId = watch('mentionId');
  const hasMention = mentionId && content.startsWith(mentionPrefix);
  const contentLength = hasMention ? content.length - mentionPrefix.length : content.length;

  const { mutate: createMutate, isPending: isCreatePending } = usePhotoControllerCreateComment({
    mutation: {
      onSuccess: ({ data: comment }) => {
        if (!comment.parentId) {
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
            getPhotoControllerGetRepliesInfiniteQueryKey(photoId, comment.parentId, {}),
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
                      item.id === comment.parentId
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

  const { mutate: updateMutate } = usePhotoControllerUpdateComment({
    mutation: {
      onSuccess: ({ data: comment }) => {
        if (!comment.parentId) {
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
                    items: page.data.items.map((item) => (item.id === comment.id ? comment : item)),
                  },
                })),
              };
            },
          );
        } else {
          queryClient.setQueryData<InfiniteData<photoControllerGetRepliesResponseSuccess>>(
            getPhotoControllerGetRepliesInfiniteQueryKey(photoId, comment.parentId, {}),
            (prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                pages: prev.pages.map((page) => ({
                  ...page,
                  data: {
                    ...page.data,
                    items: page.data.items.map((item) => (item.id === comment.id ? comment : item)),
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
      debounce((id: number, data: PhotoCommentCreateRequest) => {
        createMutate(
          { id, data },
          {
            onSuccess: () => {
              reset();
              onSuccess?.();
            },
          },
        );
      }, 300),

    [createMutate, onSuccess, reset],
  );

  const debouncedUpdateMutate = useMemo(
    () =>
      debounce((id: number, commentId: number, data: PhotoCommentCreateRequest) => {
        updateMutate(
          { id, commentId, data },
          {
            onSuccess: () => {
              reset();
              onSuccess?.();
            },
          },
        );
      }, 300),
    [onSuccess, reset, updateMutate],
  );

  const onSubmit = handleSubmit((body) => {
    const payload = {
      ...body,
      content: hasMention ? body.content.slice(mentionPrefix.length) : body.content,
    };

    if (!isModify) {
      debouncedCreateMutate(photoId, payload);
    } else {
      if (commentId) {
        debouncedUpdateMutate(photoId, commentId, payload);
      }
    }
  });

  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' && hasMention) {
      const { selectionStart, selectionEnd } = e.currentTarget;

      if (
        (selectionStart < mentionPrefix.length && selectionStart !== selectionEnd) ||
        (selectionStart <= mentionPrefix.length && selectionStart === selectionEnd && selectionStart > 0)
      ) {
        e.preventDefault();
        setValue('content', content.slice(Math.max(mentionPrefix.length, selectionEnd)), { shouldValidate: true });
        setValue('mentionId', null);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
    >
      <div className="flex items-start gap-4">
        <div className="hidden h-9 w-9 items-center justify-center sm:flex">
          <Image
            className="h-9 w-9 rounded-full object-cover"
            src={user?.thumbnail ?? ''}
            alt=""
            width={36}
            height={36}
          />
        </div>
        <div className="relative flex min-h-10 flex-1">
          {hasMention && (
            <div className="absolute z-10 text-sm text-emerald-500 dark:text-emerald-400">{mentionPrefix}</div>
          )}
          <textarea
            {...register('content')}
            onKeyDown={handleContentKeyDown}
            className="field-sizing-content min-h-full w-full resize-none border-none text-sm outline-none"
            placeholder={!mention ? '소중한 댓글을 남겨주세요' : ''}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            <span className={contentLength > 1000 ? 'text-red-500' : ''}>{contentLength}</span>
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
            disabled={!isValid || isCreatePending || !contentLength}
            className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-1 text-sm font-medium text-emerald-50 transition-colors duration-300 hover:bg-emerald-600/90 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300 dark:bg-emerald-800 dark:hover:bg-emerald-800/90 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500 dark:disabled:hover:bg-zinc-700"
          >
            {!isModify ? '등록' : '수정'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfilePhotoCommentEditor;
