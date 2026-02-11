import { PhotoControllerAllSort } from '@/api/index.schemas';
import HomePhotoMasonrySuspense from '@/components/home/HomePhotoMasonrySuspense';

export default function HomeLatestPage() {
  return <HomePhotoMasonrySuspense sort={PhotoControllerAllSort.LATEST} />;
}
