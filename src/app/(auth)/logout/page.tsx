'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { push } = useRouter();

  useEffect(() => {
    push(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`);
  }, [push]);

  return <div />;
}
