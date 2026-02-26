import { getProfileControllerPhotoQueryOptions } from '@/api/profile';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import ProfilePhotoViewer from './ProfilePhotoViewer';
import ProfilePhotoViewerSkeleton from './ProfilePhotoViewerSkeleton';

interface Props {
  username: string;
  id: number;
}

async function ProfilePhotoViewerServerSuspense({ username, id }: Props) {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  queryClient.prefetchQuery(
    getProfileControllerPhotoQueryOptions(username, id, {
      request: {
        headers: {
          cookie,
        },
      },
    }),
  );

  return (
    <Suspense fallback={<ProfilePhotoViewerSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfilePhotoViewer username={username} id={id} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProfilePhotoViewerServerSuspense;
