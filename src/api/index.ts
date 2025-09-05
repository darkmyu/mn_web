import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './schema';
import { AuthInfoResponse } from './types';

const _api = createFetchClient<paths>({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' });

const middleware: Middleware = {
  onResponse: async ({ request, response }) => {
    if (!response.ok && response.status === 401) {
      const refresh = await _api.GET('/api/v1/auth/refresh');
      if (!refresh.error) {
        return fetch(request);
      }
    }

    if (response.ok && request.url === `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/info`) {
      const body: AuthInfoResponse = await response.clone().json();

      if (!body.isAuthenticated) {
        const refresh = await _api.GET('/api/v1/auth/refresh');
        if (!refresh.error) {
          return fetch(request);
        }
      }
    }
  },
};

export const api = createFetchClient<paths>({ baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: 'include' });
api.use(middleware);

export const $api = createClient(api);
