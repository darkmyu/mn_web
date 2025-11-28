import { $api } from '@/api';
import Profile from '@/components/profile/Profile';
import ProfileAnimalList from '@/components/profile/ProfileAnimalList';
import ProfileAnimalPhotoGrid from '@/components/profile/ProfileAnimalPhotoGrid';
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
    await queryClient.fetchQuery(
      $api.queryOptions('get', '/api/v1/profiles/{username}', {
        params: {
          path: { username },
        },
      }),
    );
  } catch {
    notFound();
  }

  try {
    await queryClient.fetchQuery(
      $api.queryOptions('get', '/api/v1/profiles/{username}/animals', {
        params: {
          path: { username },
        },
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
        <ProfileAnimalPhotoGrid username={username} />
      </div>
    </HydrationBoundary>
  );
}
