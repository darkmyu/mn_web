import { PhotoCreateRequest } from '@/api/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export type PhotoBody = PhotoCreateRequest;

export function usePhotoForm() {
  return useForm<PhotoBody>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        animalId: z.number().min(1),
        url: z.string().min(1),
        title: z.string().optional(),
        description: z.string().optional(),
        tags: z.string().array().optional(),
      }),
    ),
    defaultValues: {},
  });
}
