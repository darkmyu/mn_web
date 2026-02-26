import { Suspense } from 'react';
import ProfilePhotoCommentContainerSkeleton from './ProfilePhotoCommentContainerSkeleton';
import ProfilePhotoCommentList from './ProfilePhotoCommentList';

interface Props {
  id: number;
}

function ProfilePhotoCommentListClientSuspense({ id }: Props) {
  return (
    <Suspense fallback={<ProfilePhotoCommentContainerSkeleton />}>
      <ProfilePhotoCommentList id={id} />
    </Suspense>
  );
}

export default ProfilePhotoCommentListClientSuspense;
