import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';

import jwt from 'jsonwebtoken';
import Providers from '@/providers/Providers';
import type { User } from '@/providers/auth/types';

import './globals.css';
import 'react-datetime/css/react-datetime.css';

export const metadata: Metadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
  icons: { icon: '/assets/favicon.ico' },
};

function decodeBase64URL(value: string): Buffer {
  let base64String = value.replace(/-/g, '+').replace(/_/g, '/');

  const padding = base64String.length % 4;
  if (padding === 2) {
    base64String += '==';
  } else if (padding === 3) {
    base64String += '=';
  }

  return Buffer.from(base64String, 'base64');
}

const secret = decodeBase64URL(`${process.env.JWT_SECRET}`);

function getPayload(token: string | undefined): jwt.JwtPayload | undefined {
  if (!token) return undefined;
  try {
    const decodedToken = jwt.verify(token, secret);
    if (typeof decodedToken === 'object') return decodedToken;
  } catch {
    return undefined;
  }
  return undefined;
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  let user: undefined | User;

  const accessTokenString = cookieStore.get('access-token')?.value;
  const accessToken = getPayload(accessTokenString);
  const refreshTokenString = cookieStore.get('refresh-token')?.value;
  const refreshToken = getPayload(refreshTokenString);

  // 엑세스 토큰과 리프레시 토큰이 유효하면 통과
  if (accessToken && refreshToken && accessToken.sub && accessToken.nickname) {
    user = { id: accessToken.sub, nickname: accessToken.nickname };
  }
  // 리프레시 토큰은 유효한데 엑세스 토큰이 유효하지 않은 경우
  else if (!accessToken && refreshToken) {
    try {
      // 유저 프로필 API 호출해서 엑세스 토큰 재발급
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refresh-token=${refreshTokenString}`,
        },
        credentials: 'include',
      });
      const userProfile = await response.json();
      if (userProfile.id && userProfile.nickname) user = userProfile;
    } catch {
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
