import { client } from '.';
import type { components } from './schema';

export type AuthRegisterRequest = components['schemas']['RegisterRequest'];
export type AuthRegisterResponse = components['schemas']['RegisterResponse'];

export const postAuthRegister = async (body: AuthRegisterRequest) => {
  const response = await client.POST('/api/v1/auth/register', { body });
  return response.data;
};
