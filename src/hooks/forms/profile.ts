import { UserUpdateRequest } from '@/api/index.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function useProfileForm(defaultValues?: UserUpdateRequest) {
  return useForm<UserUpdateRequest>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        nickname: z.string().min(1),
        about: z.string().optional().nullable(),
        thumbnail: z.string().optional().nullable(),
      }),
    ),
    defaultValues,
  });
}
