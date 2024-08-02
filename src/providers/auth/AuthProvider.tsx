'use client';

import { useEffect, useMemo, useState, createContext } from 'react';
import { fetchUserProfile } from '@/services/user/fetch';
import { useCookie } from '@/hooks/useCookie';
import type { User, AuthContext as AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default function AuthProvider({ children, init }: React.PropsWithChildren<{ init?: User }>) {
  const { hasCookie, getCookie } = useCookie();
  const [user, setUser] = useState<User | null>(init || null);

  useEffect(() => {
    (async () => {
      if (user) return;
      const data = hasCookie('user-profile') ? JSON.parse(getCookie('user-profile')!) : null;
      setUser(data || (await fetchUserProfile()));
    })();
  }, [getCookie, hasCookie, user]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
