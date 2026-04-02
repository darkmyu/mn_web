import { Suspense } from 'react';
import SettingProfile from './SettingProfile';

function SettingProfileSuspense() {
  return (
    <Suspense>
      <SettingProfile />
    </Suspense>
  );
}

export default SettingProfileSuspense;
