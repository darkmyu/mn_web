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
  const { ref, inView } = useInView();

  const { data, hasNextPage, isFetched, fetchNextPage } = usePhotoControllerAllSuspenseInfinite(
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
    if (inView && hasNextPage && isFetched) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetched]);

  return (
    <PhotoMasonry photos={photos}>
      <div ref={ref} />
    </PhotoMasonry>
  );
}

export default HomePhotoMasonry;
