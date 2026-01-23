import { profileControllerRead } from '@/api/profile';
import ProfileAnimalListSuspense from '@/components/profile/ProfileAnimalListSuspense';
import ProfilePhotoMasonrySuspense from '@/components/profile/ProfilePhotoMasonrySuspense';
import ProfileSuspense from '@/components/profile/ProfileSuspense';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  await profileControllerRead(username).catch(() => notFound());

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-20 py-16">
      <div className="flex flex-col gap-16">
        <ProfileSuspense username={username} />
        <ProfileAnimalListSuspense username={username} />
      </div>
      <ProfilePhotoMasonrySuspense username={username} />
    </div>
  );
}
