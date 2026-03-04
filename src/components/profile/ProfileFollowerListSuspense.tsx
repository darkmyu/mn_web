'use client';

import { Suspense } from 'react';
import ProfileFollowerList from './ProfileFollowerList';
import ProfileFollowerListSkeleton from './ProfileFollowerListSkeleton';

interface Props {
  username: string;
}

function ProfileFollowerListSuspense({ username }: Props) {
  return (
    <Suspense fallback={<ProfileFollowerListSkeleton />}>
      <ProfileFollowerList username={username} />
    </Suspense>
  );
}

export default ProfileFollowerListSuspense;
