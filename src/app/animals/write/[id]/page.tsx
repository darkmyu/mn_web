import { api } from '@/api';
import AnimalForm from '@/components/animal/AnimalForm';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: number }>;
}

export default async function AnimalsEditPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const { data } = await api.GET('/api/v1/animals/{id}', {
    params: {
      path: { id },
    },
    headers: {
      cookie,
    },
  });

  if (!data) notFound();

  return <AnimalForm animal={data} />;
}
