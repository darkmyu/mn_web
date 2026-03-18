import { profileControllerRead } from '@/api/profile';
import ProfileAnimalListSuspense from '@/components/profile/ProfileAnimalListSuspense';
import ProfileFollowerListSuspense from '@/components/profile/ProfileFollowerListSuspense';
import ProfileFollowingListSuspense from '@/components/profile/ProfileFollowingListSuspense';
import ProfilePhotoMasonrySuspense from '@/components/profile/ProfilePhotoMasonrySuspense';
import ProfileSuspense from '@/components/profile/ProfileSuspense';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: 'photos' | 'followers' | 'followings' }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  try {
    const { data: profile } = await profileControllerRead(username);

    const title = profile.nickname;
    const description = profile.about || `${profile.nickname}님의 귀여운 동물들을 만나보세요!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        siteName: '몽냥',
        images: profile.thumbnail ?? undefined,
        url: `https://mongnyang.com/@${profile.username}`,
      },
      twitter: {
        title,
        description,
        card: 'summary',
        images: profile.thumbnail ?? undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const { tab = 'photos' } = await searchParams;

  await profileControllerRead(username).catch(() => notFound());

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-[280px_1fr] items-start gap-20 px-4 py-16 max-lg:flex max-lg:flex-col max-lg:gap-10 max-lg:py-8">
      <div className="sticky top-16 flex w-full flex-col gap-8 max-lg:static max-lg:gap-4">
        <ProfileSuspense username={username} />
        <ProfileAnimalListSuspense username={username} />
      </div>
      {tab === 'photos' && <ProfilePhotoMasonrySuspense username={username} />}
      {tab === 'followers' && <ProfileFollowerListSuspense username={username} />}
      {tab === 'followings' && <ProfileFollowingListSuspense username={username} />}
    </div>
  );
}
