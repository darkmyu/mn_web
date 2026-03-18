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
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 800px 0px',
    threshold: 0.01,
  });

  const { data, hasNextPage, isFetched, isFetchingNextPage, fetchNextPage } =
    useProfileControllerPhotosSuspenseInfinite(
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
    if (inView && hasNextPage && isFetched && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetched, isFetchingNextPage]);

  if (photos.length === 0) {
    return <ProfilePhotoEmpty username={username} />;
  }

  return (
    <div className="flex w-full flex-col">
      <PhotoMasonry photos={photos} />
      <div ref={ref} aria-hidden={true} />
    </div>
  );
}

export default ProfilePhotoMasonry;
