import { getPhotoControllerAllInfiniteQueryOptions } from '@/api/photo';
import TagPhotoMasonry from '@/components/tag/TagPhotoMasonry';
import TagPhotoMasonrySkeleton from '@/components/tag/TagPhotoMasonrySkeleton';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TagsPage({ params }: Props) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery(
    getPhotoControllerAllInfiniteQueryOptions({
      limit: 30,
      tag,
    }),
  );

  return (
    <Suspense fallback={<TagPhotoMasonrySkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TagPhotoMasonry tag={tag} />
      </HydrationBoundary>
    </Suspense>
  );
}
