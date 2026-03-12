import { profileControllerPhoto } from '@/api/profile';
import ProfilePhotoCommentListServerSuspense from '@/components/profile/ProfilePhotoCommentListServerSuspense';
import ProfilePhotoViewerServerSuspense from '@/components/profile/ProfilePhotoViewerServerSuspense';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ username: string; id: number }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, id } = await params;

  try {
    const { data: photo } = await profileControllerPhoto(username, id);

    const title = photo.title || '몽냥';

    return {
      title,
      description: '',
      openGraph: {
        title,
        description: '',
        type: 'website',
        images: photo.image.path,
        url: `https://mongnyang.com/@${username}/photos/${id}`,
      },
      twitter: {
        title,
        description: '',
        card: 'summary_large_image',
        images: photo.image.path,
      },
    };
  } catch {
    return {};
  }
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
