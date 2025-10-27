import { $api } from '@/api';
import Header from '@/components/header/Header';
import Profile from '@/components/profile/Profile';
import ProfileAnimalList from '@/components/profile/ProfileAnimalList';
import ProfileAnimalPhotos from '@/components/profile/ProfileAnimalPhotoGrid';
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
      $api.queryOptions('get', '/api/v1/users/{username}', {
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
      $api.queryOptions('get', '/api/v1/users/{username}/animals', {
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
      <div className="grid grid-cols-[1fr_min(1280px,100%)_1fr]">
        <Header />
        <main className="col-2 my-16 flex flex-col gap-24">
          <Profile username={username} />
          <div className="flex flex-col gap-8">
            <ProfileAnimalList username={username} />
            <ProfileAnimalPhotos username={username} />
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
