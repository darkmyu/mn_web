'use client';

import { authControllerInfo } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';

function AuthProvider() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (user) return;

    authControllerInfo().then((response) => {
      setUser(response.data.profile);
    });
  }, [user, setUser]);

  return null;
}

export default AuthProvider;
