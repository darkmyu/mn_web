import { getPhotoControllerAllInfiniteQueryOptions } from '@/api/photo';
import HomePhotoMasonry from '@/components/home/HomePhotoMasonry';
import PhotoMasonrySkeleton from '@/components/photo/PhotoMasonrySkeleton';
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
    <Suspense fallback={<PhotoMasonrySkeleton count={40} />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePhotoMasonry />
      </HydrationBoundary>
    </Suspense>
  );
}
