import { PhotoControllerAllSort } from '@/api/index.schemas';
import { getPhotoControllerAllInfiniteQueryOptions } from '@/api/photo';
import HomePhotoMasonry from '@/components/home/HomePhotoMasonry';
import PhotoMasonrySkeleton from '@/components/photo/PhotoMasonrySkeleton';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function HomeLatestPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery(
    getPhotoControllerAllInfiniteQueryOptions({
      sort: PhotoControllerAllSort.LATEST,
      limit: 30,
    }),
  );

  return (
    <Suspense fallback={<PhotoMasonrySkeleton count={30} />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePhotoMasonry sort={PhotoControllerAllSort.LATEST} />
      </HydrationBoundary>
    </Suspense>
  );
}
