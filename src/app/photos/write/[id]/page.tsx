import { api } from '@/api';
import PhotoForm from '@/components/photo/PhotoForm';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: number }>;
}

export default async function PhotosEditPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const { data } = await api.GET('/api/v1/photos/{id}', {
    params: {
      path: { id },
    },
    headers: {
      cookie,
    },
  });

  if (!data) notFound();

  return <PhotoForm photo={data} />;
}
