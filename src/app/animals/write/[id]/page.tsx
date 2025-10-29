import { $api } from '@/api';
import AnimalEdit from '@/components/animal/AnimalEdit';
import { getQueryClient } from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: number }>;
}

export default async function AnimalsEditPage({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(
      $api.queryOptions('get', '/api/v1/animals/{id}', {
        params: {
          path: { id },
        },
      }),
    );
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimalEdit id={id} />
    </HydrationBoundary>
  );
}
