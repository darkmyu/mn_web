'use client';

import { $api } from '@/api';
import AnimalForm from './AnimalForm';

interface Props {
  id: number;
}

function AnimalEdit({ id }: Props) {
  const { data } = $api.useSuspenseQuery('get', '/api/v1/animals/{id}', {
    params: {
      path: { id },
    },
  });

  return <AnimalForm animal={data} />;
}

export default AnimalEdit;
