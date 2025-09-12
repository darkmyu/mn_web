import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './schema';

export const api = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export const $api = createClient(api);
