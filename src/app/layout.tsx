import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/Providers';
import { cookies } from 'next/headers';
import { User } from '@/providers/auth/types';

export const metadata: Metadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const user = cookieStore.has('user-profile')
    ? (JSON.parse(cookieStore.get('user-profile')!.value) as User)
    : undefined;

  return (
    <Providers init={{ user }}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
