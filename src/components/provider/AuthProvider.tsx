'use client';

import { authControllerInfo } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';

function AuthProvider() {
  const { profile, setProfile } = useAuthStore();

  useEffect(() => {
    if (profile) return;

    authControllerInfo().then((response) => {
      setProfile(response.profile);
    });
  }, [setProfile, profile]);

  return null;
}

export default AuthProvider;
