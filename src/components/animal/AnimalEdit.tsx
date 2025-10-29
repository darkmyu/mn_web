'use client';

import { $api } from '@/api';
import AnimalForm from './AnimalForm';

interface Props {
  id: number;
  cookie: string;
}

function AnimalEdit({ id, cookie }: Props) {
  const { data } = $api.useSuspenseQuery('get', '/api/v1/animals/{id}', {
    params: {
      path: { id },
    },
    headers: { cookie },
  });

  return <AnimalForm animal={data} />;
}

export default AnimalEdit;
