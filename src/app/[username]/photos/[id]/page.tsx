import { getProfileControllerPhotoQueryOptions } from '@/api/profile';
import ProfilePhotoViewer from '@/components/profile/ProfilePhotoViewer';
import { extractUsername } from '@/utils/extractors';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: number; username: string }>;
}

export default async function ProfilePhotosViewerPage({ params }: Props) {
  const queryClient = getQueryClient();
  const { id } = await params;
  const username = await extractUsername(params);

  try {
    await queryClient.fetchQuery(getProfileControllerPhotoQueryOptions(username, id));
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePhotoViewer id={id} username={username} />
    </HydrationBoundary>
  );
}
