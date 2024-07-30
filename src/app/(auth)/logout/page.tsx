'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { push } = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    push(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`);
  }, [push, logout]);

  return <div />;
}
