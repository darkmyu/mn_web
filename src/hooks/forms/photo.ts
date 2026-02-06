import { PhotoCreateRequest } from '@/api/index.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function usePhotoForm(defaultValues?: PhotoCreateRequest) {
  return useForm<PhotoCreateRequest>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        animalIds: z.number().array().min(1),
        image: z.object({
          path: z.string().min(1),
          size: z.number().min(1),
          width: z.number().min(1),
          height: z.number().min(1),
          mimetype: z.string().min(1),
        }),
        title: z.string().max(100).optional().nullable(),
        description: z.string().max(1000).optional().nullable(),
        tags: z.string().array().optional(),
      }),
    ),
    defaultValues: {
      title: '',
      description: '',
      ...defaultValues,
    },
  });
}
