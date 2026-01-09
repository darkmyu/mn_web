import {
  getProfileControllerAnimalsQueryOptions,
  getProfileControllerPhotosInfiniteQueryOptions,
  getProfileControllerReadQueryOptions,
} from '@/api/profile';
import Profile from '@/components/profile/Profile';
import ProfileAnimalList from '@/components/profile/ProfileAnimalList';
import ProfilePhotoMasonry from '@/components/profile/ProfilePhotoMasonry';
import { extractUsername } from '@/utils/extractors';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const queryClient = getQueryClient();
  const username = await extractUsername(params);

  try {
    await queryClient.fetchQuery(getProfileControllerReadQueryOptions(username));
  } catch {
    notFound();
  }

  /** @TODO redirect error page */
  await queryClient.prefetchQuery(getProfileControllerAnimalsQueryOptions(username));

  /** @TODO redirect error page */
  await queryClient.prefetchInfiniteQuery(
    getProfileControllerPhotosInfiniteQueryOptions(username, {
      limit: 20,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-20 py-16">
        <div className="flex flex-col gap-16">
          <Profile username={username} />
          <ProfileAnimalList username={username} />
        </div>
        <ProfilePhotoMasonry username={username} />
      </div>
    </HydrationBoundary>
  );
}
