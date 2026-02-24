'use client';

import { usePhotoControllerAllSuspenseInfinite } from '@/api/photo';
import { formatNumber } from '@/utils/formatters';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoMasonry from '../photo/PhotoMasonry';

interface Props {
  tag: string;
}

function TagPhotoMasonry({ tag }: Props) {
  const { ref, inView } = useInView();

  const { data, hasNextPage, isFetched, isFetchingNextPage, fetchNextPage } = usePhotoControllerAllSuspenseInfinite(
    {
      limit: 30,
      tag,
    },
    {
      query: {
        getNextPageParam: (lastPage) => (lastPage.data.hasNextPage ? lastPage.data.cursor : undefined),
      },
    },
  );

  const total = data.pages[0]?.data.total ?? 0;
  const photos = data.pages.flatMap((page) => page.data.items);

  useEffect(() => {
    if (inView && hasNextPage && isFetched) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetched]);

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">#{tag}</h1>
        <p className="text-sm text-neutral-500">{`반려동물 사진 ${formatNumber(total)}장`}</p>
      </div>
      <PhotoMasonry photos={photos} isFetchingNextPage={isFetchingNextPage}>
        <div ref={ref} />
      </PhotoMasonry>
    </div>
  );
}

export default TagPhotoMasonry;
