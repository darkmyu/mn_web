import {
  getProfileControllerAnimalsQueryOptions,
  getProfileControllerPhotosInfiniteQueryOptions,
  getProfileControllerReadQueryOptions,
} from '@/api/profile';
import Profile from '@/components/profile/Profile';
import ProfileAnimalList from '@/components/profile/ProfileAnimalList';
import ProfilePhotoMasonry from '@/components/profile/ProfilePhotoMasonry';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getProfileControllerReadQueryOptions(username));
  } catch {
    notFound();
  }

  try {
    await queryClient.fetchQuery(getProfileControllerAnimalsQueryOptions(username));
  } catch {
    notFound(); /** @TODO redirect error page */
  }

  try {
    await queryClient.fetchInfiniteQuery(
      getProfileControllerPhotosInfiniteQueryOptions(username, {
        limit: 20,
      }),
    );
  } catch {
    notFound(); /** @TODO redirect error page */
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-20 p-16">
        <div className="flex flex-col gap-16">
          <Profile username={username} />
          <ProfileAnimalList username={username} />
        </div>
        <ProfilePhotoMasonry username={username} />
      </div>
    </HydrationBoundary>
  );
}
