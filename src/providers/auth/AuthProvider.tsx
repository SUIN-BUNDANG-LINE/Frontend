'use client';

import { useMemo, useState, createContext } from 'react';
import type { User, AuthContext as AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default function AuthProvider({ children, init }: React.PropsWithChildren<{ init?: User }>) {
  const [user, setUser] = useState<User | null>(init || null);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
