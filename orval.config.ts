import { defineConfig } from 'orval';

export default defineConfig({
  mntop: {
    input: {
      target: 'http://localhost:4000/api-json',
    },
    output: {
      mode: 'tags',
      target: './src/api/index.ts',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: 'http://localhost:4000',
      prettier: true,
      tsconfig: './tsconfig.json',
      override: {
        fetch: {
          forceSuccessResponse: true,
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useMutation: true,
          usePrefetch: true,
          useSuspenseQuery: true,
          useSuspenseInfiniteQuery: true,
          useInfiniteQueryParam: 'cursor',
        },
        requestOptions: {
          credentials: 'include',
        },
      },
    },
  },
});
