import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from './schema';

const middleware: Middleware = {
  onRequest: ({ request, options }) => {},
  onResponse: ({ request, response, options }) => {},
};

export const client = createClient<paths>({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' });
client.use(middleware);
