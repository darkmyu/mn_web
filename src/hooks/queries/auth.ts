import { postAuthRegister } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useAuthRegisterMutation = () => {
  return useMutation({ mutationFn: postAuthRegister });
};
