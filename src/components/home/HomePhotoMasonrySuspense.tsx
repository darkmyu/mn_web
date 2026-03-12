'use client';

import { PhotoControllerAllSort } from '@/api/index.schemas';
import { Suspense } from 'react';
import MasonrySkeleton from '../masonry/MasonrySkeleton';
import HomePhotoMasonry from './HomePhotoMasonry';

interface Props {
  sort?: PhotoControllerAllSort;
}

function HomePhotoMasonrySuspense({ sort }: Props) {
  return (
    <Suspense fallback={<MasonrySkeleton count={30} />}>
      <HomePhotoMasonry sort={sort} />
    </Suspense>
  );
}

export default HomePhotoMasonrySuspense;
