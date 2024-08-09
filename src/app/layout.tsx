import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/Providers';
import { cookies } from 'next/headers';
import { User } from '@/providers/auth/types';
import { decodeBase64 } from '@/utils/misc';

export const metadata: Metadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  let user: undefined | User;

  if (cookieStore.has('user-profile')) {
    try {
      const { value } = cookieStore.get('user-profile')!;
      const data = JSON.parse(decodeBase64(value));
      if (typeof data !== 'object') throw new Error();
      if (!data.nickname || typeof data.nickname !== 'string') throw new Error();
      if (!data.id || typeof data.id !== 'string') throw new Error();
      user = { nickname: data.nickname, id: data.id } as User;
    } catch (e) {
      user = undefined;
    }
  }

  return (
    <html lang="ko">
      <body>
        <Providers init={{ user }}>{children}</Providers>
      </body>
    </html>
  );
}
