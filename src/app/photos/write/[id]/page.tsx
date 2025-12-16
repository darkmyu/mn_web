import { photoControllerRead } from '@/api/photo';
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

  try {
    const response = await photoControllerRead(id, {
      headers: {
        cookie,
      },
    });

    return <PhotoForm photo={response.data} />;
  } catch {
    notFound();
  }
}
