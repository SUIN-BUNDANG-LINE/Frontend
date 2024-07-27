import type { Metadata } from 'next';
import './globals.css';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

export const metadata: Metadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryClientProvider>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
