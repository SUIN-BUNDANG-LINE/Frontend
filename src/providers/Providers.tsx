'use client';

import AuthProvider from './auth/AuthProvider';
import type { User } from './auth/types';
import ReactQueryClientProvider from './query/ReactQueryClientProvider';

interface Props {
  init: {
    user?: User;
  };
}

export default function Providers({ children, init }: React.PropsWithChildren<Props>) {
  const { user } = init;

  return (
    <ReactQueryClientProvider>
      <AuthProvider init={user}>{children}</AuthProvider>
    </ReactQueryClientProvider>
  );
}
