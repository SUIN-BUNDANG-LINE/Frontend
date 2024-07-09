import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/providers/ReactQueryClientProvider';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryClientProvider>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
