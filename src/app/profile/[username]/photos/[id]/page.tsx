import ProfilePhotoViewerSuspense from '@/components/profile/ProfilePhotoViewerSuspense';

interface Props {
  params: Promise<{ username: string; id: number }>;
}

export default async function ProfilePhotosViewerPage({ params }: Props) {
  const { username, id } = await params;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 py-16">
      <ProfilePhotoViewerSuspense username={username} id={id} />
    </div>
  );
}
