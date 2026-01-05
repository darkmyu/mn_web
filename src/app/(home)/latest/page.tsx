import { PhotoControllerAllSort } from '@/api/index.schemas';
import { getPhotoControllerAllInfiniteQueryOptions } from '@/api/photo';
import HomePhotoMasonry from '@/components/home/HomePhotoMasonry';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function HomeLatestPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    getPhotoControllerAllInfiniteQueryOptions({
      sort: PhotoControllerAllSort.LATEST,
      limit: 30,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePhotoMasonry sort={PhotoControllerAllSort.LATEST} />
    </HydrationBoundary>
  );
}
