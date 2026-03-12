'use client';

import { type PhotoControllerAllSort } from '@/api/index.schemas';
import { usePhotoControllerAllSuspenseInfinite } from '@/api/photo';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoMasonry from '../photo/PhotoMasonry';

interface Props {
  sort?: PhotoControllerAllSort;
}

function HomePhotoMasonry({ sort }: Props) {
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 800px 0px',
    threshold: 0.01,
  });

  const { data, hasNextPage, isFetched, isFetchingNextPage, fetchNextPage } = usePhotoControllerAllSuspenseInfinite(
    {
      sort,
      limit: 30,
    },
    {
      query: {
        getNextPageParam: (lastPage) => (lastPage.data.hasNextPage ? lastPage.data.cursor : undefined),
      },
    },
  );

  const photos = data.pages.flatMap((page) => page.data.items);

  useEffect(() => {
    if (inView && hasNextPage && isFetched && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetched, isFetchingNextPage]);

  return (
    <div className="flex flex-col">
      <PhotoMasonry photos={photos} />
      <div ref={ref} aria-hidden={true} />
    </div>
  );
}

export default HomePhotoMasonry;
