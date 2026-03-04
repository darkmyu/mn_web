import { profileControllerRead } from '@/api/profile';
import ProfileAnimalListSuspense from '@/components/profile/ProfileAnimalListSuspense';
import ProfileFollowerListSuspense from '@/components/profile/ProfileFollowerListSuspense';
import ProfileFollowingListSuspense from '@/components/profile/ProfileFollowingListSuspense';
import ProfilePhotoMasonrySuspense from '@/components/profile/ProfilePhotoMasonrySuspense';
import ProfileSuspense from '@/components/profile/ProfileSuspense';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: 'photos' | 'followers' | 'followings' }>;
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const { tab = 'photos' } = await searchParams;

  await profileControllerRead(username).catch(() => notFound());

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:gap-20 sm:py-16">
      <div className="flex flex-col gap-8 sm:gap-16">
        <ProfileSuspense username={username} />
        <ProfileAnimalListSuspense username={username} />
      </div>
      {tab === 'photos' && <ProfilePhotoMasonrySuspense username={username} />}
      {tab === 'followers' && <ProfileFollowerListSuspense username={username} />}
      {tab === 'followings' && <ProfileFollowingListSuspense username={username} />}
    </div>
  );
}
