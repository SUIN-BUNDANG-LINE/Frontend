import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';

import { decodeBase64 } from '@/utils/misc';
import Providers from '@/providers/Providers';
import type { User } from '@/providers/auth/types';

import './globals.css';

export const metadata: Metadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
  icons: { icon: '/assets/favicon.ico' },
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
      <GoogleAnalytics gaId="G-1LB0NWC7BT" />
    </html>
  );
}
