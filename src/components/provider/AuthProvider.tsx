'use client';

import { api } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';

function AuthProvider() {
  const { profile, setProfile } = useAuthStore();

  useEffect(() => {
    if (profile) return;

    api.GET('/api/v1/auth/info').then((response) => {
      if (response.data) {
        setProfile(response.data.profile);
      }
    });
  }, [setProfile, profile]);

  return null;
}

export default AuthProvider;
