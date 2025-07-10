import createClient from 'openapi-fetch';
import { middleware } from './middleware';
import type { paths } from './schema';

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

client.use(middleware);
