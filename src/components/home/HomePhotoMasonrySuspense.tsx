'use client';

import { PhotoControllerAllSort } from '@/api/index.schemas';
import { Suspense } from 'react';
import PhotoMasonrySkeleton from '../photo/PhotoMasonrySkeleton';
import HomePhotoMasonry from './HomePhotoMasonry';

interface Props {
  sort?: PhotoControllerAllSort;
}

function HomePhotoMasonrySuspense({ sort }: Props) {
  return (
    <Suspense fallback={<PhotoMasonrySkeleton count={30} />}>
      <HomePhotoMasonry sort={sort} />
    </Suspense>
  );
}

export default HomePhotoMasonrySuspense;
