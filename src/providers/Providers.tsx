'use client';

import AuthProvider from './auth/AuthProvider';
import type { User } from './auth/types';
import ToastProvider from './ToastProvider';
import ReactQueryClientProvider from './ReactQueryClientProvider';
import FpjsProvider from './FpjsProvider';

interface Props {
  init: {
    user?: User;
  };
}

export default function Providers({ children, init }: React.PropsWithChildren<Props>) {
  const { user } = init;

  return (
    <FpjsProvider>
      <ReactQueryClientProvider>
        <AuthProvider init={user}>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </ReactQueryClientProvider>
    </FpjsProvider>
  );
}
