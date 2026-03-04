'use client';

import { Suspense } from 'react';
import ProfileFollowerListSkeleton from './ProfileFollowerListSkeleton';
import ProfileFollowingList from './ProfileFollowingList';

interface Props {
  username: string;
}

function ProfileFollowingListSuspense({ username }: Props) {
  return (
    <Suspense fallback={<ProfileFollowerListSkeleton />}>
      <ProfileFollowingList username={username} />
    </Suspense>
  );
}

export default ProfileFollowingListSuspense;
