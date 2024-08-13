'use client';

import { useEffect, useMemo, useState, createContext } from 'react';
import { useCookie } from '@/hooks/useCookie';
import { decodeBase64 } from '@/utils/misc';
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
      if (hasCookie('user-profile')) {
        try {
          const data = JSON.parse(decodeBase64(getCookie('user-profile')!));
          if (typeof data !== 'object') throw new Error();
          if (!data.nickname || typeof data.nickname !== 'string') throw new Error();
          if (!data.id || typeof data.id !== 'string') throw new Error();
          setUser({ nickname: data.nickname, id: data.id });
        } catch (e) {
          setUser(null);
        }
      }
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
