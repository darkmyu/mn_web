import { AuthRegisterRequest } from '@/api/index.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useAuthRegisterForm = () => {
  return useForm<AuthRegisterRequest>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        nickname: z.string().trim().min(1, '이름을 입력해주세요.').max(30, '30자 이내로 입력해주세요.'),
        username: z
          .string()
          .trim()
          .min(1, '고유명을 입력해주세요.')
          .max(30, '30자 이내로 입력해주세요.')
          .regex(
            /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/,
            '영문, 숫자, 밑줄(_), 하이픈(-), 마침표(.) 만 사용하여 입력해주세요.',
          ),
      }),
    ),
  });
};
