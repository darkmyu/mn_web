'use client';

import { Suspense } from 'react';
import MasonrySkeleton from '../masonry/MasonrySkeleton';
import ProfilePhotoMasonry from './ProfilePhotoMasonry';

interface Props {
  username: string;
}

function ProfilePhotoMasonrySuspense({ username }: Props) {
  return (
    <Suspense fallback={<MasonrySkeleton count={20} />}>
      <ProfilePhotoMasonry username={username} />
    </Suspense>
  );
}

export default ProfilePhotoMasonrySuspense;
