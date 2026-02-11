'use client';

import { Suspense } from 'react';
import TagPhotoMasonry from './TagPhotoMasonry';
import TagPhotoMasonrySkeleton from './TagPhotoMasonrySkeleton';

interface Props {
  tag: string;
}

function TagPhotoMasonrySuspense({ tag }: Props) {
  return (
    <Suspense fallback={<TagPhotoMasonrySkeleton />}>
      <TagPhotoMasonry tag={tag} />
    </Suspense>
  );
}

export default TagPhotoMasonrySuspense;
