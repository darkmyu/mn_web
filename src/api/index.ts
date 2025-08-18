import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './schema';

const middleware: Middleware = {
  onRequest: ({ request, options }) => {},
  onResponse: ({ request, response, options }) => {},
};

const client = createFetchClient<paths>({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' });
client.use(middleware);

export const $api = createClient(client);
