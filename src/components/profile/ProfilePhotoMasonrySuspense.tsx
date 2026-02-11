'use client';

import { Suspense } from 'react';
import PhotoMasonrySkeleton from '../photo/PhotoMasonrySkeleton';
import ProfilePhotoMasonry from './ProfilePhotoMasonry';

interface Props {
  username: string;
}

function ProfilePhotoMasonrySuspense({ username }: Props) {
  return (
    <Suspense fallback={<PhotoMasonrySkeleton count={20} />}>
      <ProfilePhotoMasonry username={username} />
    </Suspense>
  );
}

export default ProfilePhotoMasonrySuspense;
