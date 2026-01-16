import { AnimalCreateRequest } from '@/api/index.schemas';
import dayjs from '@/utils/dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function useAnimalForm(defaultValues?: AnimalCreateRequest) {
  return useForm<AnimalCreateRequest>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        breedId: z.number().min(1),
        name: z.string().trim().min(1),
        gender: z.enum(['MALE', 'FEMALE']),
        birthday: z
          .string()
          .min(1)
          .refine((value) => {
            const date = dayjs(value, 'YYYY-MM-DD', true);
            if (!date.isValid()) return false;

            return !date.isSameOrAfter(dayjs(), 'day');
          }),
        thumbnail: z.string().optional().nullable(),
      }),
    ),
    defaultValues: {
      gender: 'MALE',
      ...defaultValues,
    },
  });
}
