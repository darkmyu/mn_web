import { getProfileControllerAnimalsQueryOptions } from '@/api/profile';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import ProfileAnimalList from './ProfileAnimalList';
import ProfileAnimalListSkeleton from './ProfileAnimalListSkeleton';

interface Props {
  username: string;
}

function ProfileAnimalListSuspense({ username }: Props) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    getProfileControllerAnimalsQueryOptions(username, {
      limit: 9999,
    }),
  );

  return (
    <Suspense fallback={<ProfileAnimalListSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileAnimalList username={username} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProfileAnimalListSuspense;
