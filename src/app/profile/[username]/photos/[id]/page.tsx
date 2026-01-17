import { getProfileControllerPhotoQueryOptions } from '@/api/profile';
import ProfilePhotoViewer from '@/components/profile/ProfilePhotoViewer';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string; id: number }>;
}

export default async function ProfilePhotosViewerPage({ params }: Props) {
  const queryClient = getQueryClient();
  const { username, id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  try {
    await queryClient.fetchQuery(
      getProfileControllerPhotoQueryOptions(username, id, {
        fetch: {
          headers: {
            cookie,
          },
        },
      }),
    );
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePhotoViewer id={id} username={username} />
    </HydrationBoundary>
  );
}
