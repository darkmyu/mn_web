import TagPhotoMasonrySuspense from '@/components/tag/TagPhotoMasonrySuspense';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TagsPage({ params }: Props) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);

  return <TagPhotoMasonrySuspense tag={tag} />;
}
