import { getPhotoControllerGetCommentsInfiniteQueryOptions } from '@/api/photo';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import ProfilePhotoCommentContainerSkeleton from './ProfilePhotoCommentContainerSkeleton';
import ProfilePhotoCommentList from './ProfilePhotoCommentList';

interface Props {
  id: number;
}

async function ProfilePhotoCommentListSuspense({ id }: Props) {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  queryClient.prefetchInfiniteQuery(
    getPhotoControllerGetCommentsInfiniteQueryOptions(
      id,
      {},
      {
        fetch: {
          headers: {
            cookie,
          },
        },
      },
    ),
  );

  return (
    <Suspense fallback={<ProfilePhotoCommentContainerSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfilePhotoCommentList id={id} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProfilePhotoCommentListSuspense;
