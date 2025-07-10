import { Middleware } from 'openapi-fetch';

export const middleware: Middleware = {
  async onRequest({ request }) {
    return request;
  },
};
