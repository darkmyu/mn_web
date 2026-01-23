import { getPhotoControllerAllInfiniteQueryOptions } from '@/api/photo';
import HomePhotoMasonry from '@/components/home/HomePhotoMasonry';
import HomePhotoMasonrySkeleton from '@/components/home/HomePhotoMasonrySkeleton';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function HomePage() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery(
    getPhotoControllerAllInfiniteQueryOptions({
      limit: 30,
    }),
  );

  return (
    <Suspense fallback={<HomePhotoMasonrySkeleton count={30} />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePhotoMasonry />
      </HydrationBoundary>
    </Suspense>
  );
}
