'use client';

import { useAuthStore } from '@/stores/auth';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

function AuthProvider() {
  const supabase = createClient();
  const { setIsAuth } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') setIsAuth(true);
      if (event === 'SIGNED_OUT') setIsAuth(false);
      if (event === 'INITIAL_SESSION' && session?.user) setIsAuth(true);
    });

    return () => {
      subscription.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default AuthProvider;
