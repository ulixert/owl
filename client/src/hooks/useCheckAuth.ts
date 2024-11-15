import { useEffect } from 'react';

import { useAuthStore } from '@stores/userAuthStore.ts';

export function useCheckAuth() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    // Check if JWT token exists in cookies
    const tokenExists = document.cookie.includes('token=');
    setAuthenticated(tokenExists);
  }, [setAuthenticated]);
}
