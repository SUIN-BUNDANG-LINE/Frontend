'use client';

import { useContext } from 'react';
import { fetchUserProfile } from '@/services/user/fetch';
import type { User } from '@/services/user/types';
import { AuthContext } from '@/providers/auth/AuthProvider';
import { useCookie } from './useCookie';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setCookie, getCookie, deleteCookie, hasCookie } = useCookie();

  const refresh = async () => {
    try {
      const data = hasCookie('user-profile') ? JSON.parse(getCookie('user-profile')!) : null;
      setUser(data || (await fetchUserProfile()));
    } catch (e) {
      setUser(null);
    }
  };

  const login = (data: User) => {
    // a function to call after login (i.e. /login/auth)
    setCookie('user-profile', JSON.stringify(data));
    refresh();
  };

  const logout = () => {
    deleteCookie('user-profile');
    refresh();
  };

  return { user, refresh, login, logout };
};
