import { PhotoCommentCreateRequest } from '@/api/index.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function useCommentForm(defaultValues?: PhotoCommentCreateRequest) {
  return useForm<PhotoCommentCreateRequest>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        content: z.string().min(1).max(1000),
        parentId: z.number().optional().nullable(),
        mentionId: z.number().optional().nullable(),
      }),
    ),
    defaultValues,
  });
}
