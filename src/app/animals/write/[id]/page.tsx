import { $api } from '@/api';
import AnimalEdit from '@/components/animal/AnimalEdit';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: number }>;
}

export default async function AnimalsEditPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(
      $api.queryOptions('get', '/api/v1/animals/{id}', {
        params: {
          path: { id },
        },
        headers: { cookie },
      }),
    );
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimalEdit id={id} cookie={cookie} />
    </HydrationBoundary>
  );
}
