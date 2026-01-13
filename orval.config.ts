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
        requestOptions: {
          credentials: 'include',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useMutation: true,
          usePrefetch: true,
          useSuspenseQuery: true,
          useSuspenseInfiniteQuery: true,
          useInfiniteQueryParam: 'page',
        },
        operations: {
          PhotoController_all: {
            query: {
              useInfiniteQueryParam: 'cursor',
            },
          },
          ProfileController_photos: {
            query: {
              useInfiniteQueryParam: 'cursor',
            },
          },
        },
      },
    },
  },
});
