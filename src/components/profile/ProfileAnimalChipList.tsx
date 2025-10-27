'use client';

import { $api } from '@/api';
import AnimalChip from '../animal/AnimalChip';

interface Props {
  username: string;
}

function ProfileAnimalChipList({ username }: Props) {
  const { data: animals } = $api.useSuspenseQuery('get', '/api/v1/users/{username}/animals', {
    params: {
      path: { username },
    },
  });

  return (
    <div className="flex items-center gap-4">
      {animals.items.map((animal) => (
        <AnimalChip key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

export default ProfileAnimalChipList;
