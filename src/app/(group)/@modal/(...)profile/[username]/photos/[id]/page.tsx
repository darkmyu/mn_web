import ProfilePhotoViewerModal from '@/components/modal/ProfilePhotoViewerModal';

interface Props {
  params: Promise<{ username: string; id: number }>;
}

export default async function ProfilePhotoViewerModalPage({ params }: Props) {
  const { username, id } = await params;

  return <ProfilePhotoViewerModal username={username} id={id} />;
}
