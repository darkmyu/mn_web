import { getProfileControllerPhotoQueryOptions } from '@/api/profile';
import ProfilePhotoViewer from '@/components/profile/ProfilePhotoViewer';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: number; username: string }>;
}

export default async function ProfilePhotosViewerPage({ params }: Props) {
  const { id, username } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getProfileControllerPhotoQueryOptions(username, id));
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-16 py-16">
        <ProfilePhotoViewer id={id} username={username} />
        {/* <div>Masonry Layout</div> */}
      </div>
    </HydrationBoundary>
  );
}
