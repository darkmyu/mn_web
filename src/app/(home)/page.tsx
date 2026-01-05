import { getPhotoControllerAllInfiniteQueryOptions } from '@/api/photo';
import HomePhotoMasonry from '@/components/home/HomePhotoMasonry';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    getPhotoControllerAllInfiniteQueryOptions({
      limit: 30,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePhotoMasonry />
    </HydrationBoundary>
  );
}
