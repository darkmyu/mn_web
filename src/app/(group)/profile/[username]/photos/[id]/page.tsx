import { profileControllerPhoto } from '@/api/profile';
import ProfilePhotoCommentListServerSuspense from '@/components/profile/ProfilePhotoCommentListServerSuspense';
import ProfilePhotoViewerServerSuspense from '@/components/profile/ProfilePhotoViewerServerSuspense';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string; id: number }>;
}

export default async function ProfilePhotosViewerPage({ params }: Props) {
  const { username, id } = await params;

  await profileControllerPhoto(username, id).catch(() => notFound());

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 pt-8 pb-16 sm:py-16">
      <ProfilePhotoViewerServerSuspense username={username} id={id} />
      <ProfilePhotoCommentListServerSuspense id={id} />
    </div>
  );
}
