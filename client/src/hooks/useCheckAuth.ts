import axios from 'axios';
import { useEffect } from 'react';
import { UserType } from 'validation';

import { useAuthStore } from '@stores/authStore.ts';

export function useCheckAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    axios
      .get<{ user: UserType }>('/api/posts/feed')
      .then((response) => {
        setUser(response.data.user);
        console.log(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
}
