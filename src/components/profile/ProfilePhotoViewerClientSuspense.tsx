import { Suspense } from 'react';
import ProfilePhotoViewer from './ProfilePhotoViewer';
import ProfilePhotoViewerSkeleton from './ProfilePhotoViewerSkeleton';

interface Props {
  username: string;
  id: number;
}

function ProfilePhotoViewerClientSuspense({ username, id }: Props) {
  return (
    <Suspense fallback={<ProfilePhotoViewerSkeleton />}>
      <ProfilePhotoViewer username={username} id={id} />
    </Suspense>
  );
}

export default ProfilePhotoViewerClientSuspense;
