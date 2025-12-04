import { animalControllerRead } from '@/api/animal';
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

  const response = await animalControllerRead(id, {
    headers: {
      cookie,
    },
  });

  if (response.status !== 200) notFound();

  return <AnimalForm animal={response.data} />;
}
