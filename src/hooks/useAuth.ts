'use client';

import { useContext } from 'react';
import { AuthContext } from '@/providers/auth/AuthProvider';

export const useAuth = () => {
  const { user } = useContext(AuthContext);

  return { user };
};
