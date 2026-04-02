import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export interface ProfileFormValues {
  nickname: string;
  about?: string | null;
  thumbnail?: string | null;
  email: string;
  website: string;
  youtube: string;
  instagram: string;
  x: string;
}

export function useProfileForm(defaultValues?: ProfileFormValues) {
  return useForm<ProfileFormValues>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        nickname: z.string().min(1).max(30),
        about: z.string().max(1000).optional().nullable(),
        thumbnail: z.string().optional().nullable(),
        email: z.string(),
        website: z.string(),
        youtube: z.string(),
        instagram: z.string(),
        x: z.string(),
      }),
    ),
    defaultValues,
  });
}
