'use client';

import { useProfileControllerPhotosSuspenseInfinite } from '@/api/profile';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoMasonry from '../photo/PhotoMasonry';

const ProfilePhotoEmpty = dynamic(() => import('./ProfilePhotoEmpty'), { ssr: false });

interface Props {
  username: string;
}

function ProfilePhotoMasonry({ username }: Props) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetched } = useProfileControllerPhotosSuspenseInfinite(
    username,
    {
      limit: 20,
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

  if (photos.length === 0) {
    return <ProfilePhotoEmpty username={username} />;
  }

  return (
    <PhotoMasonry photos={photos}>
      <div ref={ref} />
    </PhotoMasonry>
  );
}

export default ProfilePhotoMasonry;
