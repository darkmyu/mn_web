import { profileControllerPhoto } from '@/api/profile';
import ProfilePhotoCommentListSuspense from '@/components/profile/ProfilePhotoCommentListSuspense';
import ProfilePhotoViewerSuspense from '@/components/profile/ProfilePhotoViewerSuspense';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string; id: number }>;
}

export default async function ProfilePhotosViewerPage({ params }: Props) {
  const { username, id } = await params;

  await profileControllerPhoto(username, id).catch(() => notFound());

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 py-16">
      <ProfilePhotoViewerSuspense username={username} id={id} />
      <ProfilePhotoCommentListSuspense id={id} />
    </div>
  );
}
