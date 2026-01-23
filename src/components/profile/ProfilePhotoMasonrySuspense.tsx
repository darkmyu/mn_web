import { getProfileControllerPhotosInfiniteQueryOptions } from '@/api/profile';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import PhotoMasonrySkeleton from '../photo/PhotoMasonrySkeleton';
import ProfilePhotoMasonry from './ProfilePhotoMasonry';

interface Props {
  username: string;
}

function ProfilePhotoMasonrySuspense({ username }: Props) {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery(
    getProfileControllerPhotosInfiniteQueryOptions(username, {
      limit: 20,
    }),
  );

  return (
    <Suspense fallback={<PhotoMasonrySkeleton count={20} />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfilePhotoMasonry username={username} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProfilePhotoMasonrySuspense;
