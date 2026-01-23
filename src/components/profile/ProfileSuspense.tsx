import { getProfileControllerReadQueryOptions } from '@/api/profile';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Profile from './Profile';
import ProfileSkeleton from './ProfileSkeleton';

interface Props {
  username: string;
}

async function ProfileSuspense({ username }: Props) {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  queryClient.prefetchQuery(
    getProfileControllerReadQueryOptions(username, {
      fetch: {
        headers: {
          cookie,
        },
      },
    }),
  );

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile username={username} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProfileSuspense;
