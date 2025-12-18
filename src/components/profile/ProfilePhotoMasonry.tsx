'use client';

import { useProfileControllerPhotosSuspenseInfinite } from '@/api/profile';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoMasonry from '../photo/PhotoMasonry';

interface Props {
  username: string;
}

function ProfilePhotoMasonry({ username }: Props) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetched } = useProfileControllerPhotosSuspenseInfinite(
    username,
    {
      page: 1,
      limit: 20,
    },
    {
      query: {
        getNextPageParam: (lastPage) => (!lastPage.data.isLast ? lastPage.data.page + 1 : undefined),
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

export default ProfilePhotoMasonry;
