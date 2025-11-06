'use client';

import { api } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';

function AuthProvider() {
  const { user, setUser, setAnimals } = useAuthStore();

  useEffect(() => {
    if (user) return;

    api.GET('/api/v1/auth/info').then((response) => {
      if (response.data) {
        setUser(response.data.user);
        setAnimals(response.data.animals);
      }
    });
  }, [setAnimals, setUser, user]);

  return null;
}

export default AuthProvider;
